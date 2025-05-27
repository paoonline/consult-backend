import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/application/customer.service';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { SessionService } from 'src/services/Session/session.service';
import { emailValue } from '../domain/email.vo';
import { LoginEntity } from '../domain/login.entity';
import { LoginRepository } from '../infrastructure/login.repository';
import { loginLogDto } from './login.dto';
import { IRepository } from 'src/utils/respository';
@Injectable()
export class LoginService implements Omit<IRepository<loginLogDto, string>, 'delete'> {
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly customerService: CustomerService
  ) {}

  createFactory(emailId: string): LoginEntity {
    return new LoginEntity(
      new emailValue(emailId)
    );
  }
  
  async create(id: string): Promise<void> {
    this.loginRepository.create(this.createFactory(id));
  }

  async login(email: string, password: string): Promise<string> {
    // find user online
    const alreadyOnline = await this.sessionService.checkUserOnline(`${email}`)
 
    if(alreadyOnline) {
      throw new Error('Session was duplicated')
    }

    // Find the user by email
    const customer = await this.customerService.findUnique(email)
    if (!customer || !customer.password) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await this.sessionService.validatePassword(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    this.loginRepository.create(this.createFactory(customer.id));
    this.sessionService.setUserOnline(email)

    return this.jwtService.createJwtToken(customer);
  }

  findAll(): Promise<loginLogDto[]> {
    return this.loginRepository.findAll()
  }

  findOne(id: string): Promise<loginLogDto | null> {
    return this.loginRepository.findOne(id)
  }

  async logout(key: string):Promise<void> {
    this.sessionService.logout(key)
  }
}
