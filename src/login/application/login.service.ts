import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/application/customer.service';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { SessionService } from 'src/services/Session/session.service';
import { IRepository } from 'src/utils/respository';
import { LoginRepository } from '../infrastructure/login.repository';
import { loginLogDto } from './login.dto';
import { createFactory } from './login.factory';
import camelcaseKeys from 'camelcase-keys';
import { login } from '.prisma/client';
@Injectable()
export class LoginService implements Omit<IRepository<loginLogDto, string>, 'delete'> {
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly customerService: CustomerService
  ) {}
  
  async create(id: string): Promise<void> {
    this.loginRepository.create(createFactory(id));
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
    this.create(customer.id)
    this.sessionService.setUserOnline(email)

    return this.jwtService.createJwtToken(customer);
  }

  async findAll(): Promise<loginLogDto[]> {
    const result = await this.loginRepository.findAll()
    return camelcaseKeys(result) as loginLogDto[];
  }

  async findOne(id: string): Promise<loginLogDto | null> {
    const result = await this.loginRepository.findOne(id)
    return camelcaseKeys(result as login) as loginLogDto
  }

  async logout(key: string):Promise<void> {
    this.sessionService.logout(key)
  }
}
