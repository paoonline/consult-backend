import { Injectable } from '@nestjs/common';
import { login } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { LoginRepository } from '../infrastructure/login.repository';
import { LoginEntity } from '../domain/login.entity';
import { emailValue } from '../domain/email.vo';
import { SessionService } from 'src/services/Session/session.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService
  ) {}

  createFactory(emailId: string): LoginEntity {
    return new LoginEntity(
      new emailValue(emailId)
    );
  }

  async login(email: string, password: string): Promise<string> {
    // find user online
    const online = await this.sessionService.checkUserOnline(`online:${email}`)
 
    if(online) {
      throw new Error('Session was duplicated')
    }

    // Find the user by email
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    this.loginRepository.create(this.createFactory(customer.id));
    this.sessionService.setUserOnline(email)

    return this.jwtService.createJwtToken(customer);
  }

  findAll(): Promise<login[]> {
    return this.loginRepository.findAll()
  }

  findOne(id: string): Promise<login | null> {
    return this.loginRepository.findOne(id)
  }

  async logout(key: string):Promise<void> {
    this.loginRepository.logout(key)
  }
}
