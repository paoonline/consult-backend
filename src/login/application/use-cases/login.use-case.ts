// src/login/application/use-cases/login.use-case.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { SessionService } from 'src/services/Session/session.service';
import { CustomerService } from 'src/customer/application/customer.service';
import { CreateLoginRecordUseCase } from './create-login-record.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly customerService: CustomerService,
    private readonly createLoginRecordUseCase: CreateLoginRecordUseCase,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const newEmail = email.toLowerCase();
    const alreadyOnline = await this.sessionService.checkUserOnline(newEmail);
    if (alreadyOnline) throw new Error('Session was duplicated');

    const customer = await this.customerService.findFirst(newEmail);
    if (!customer || !customer.password) throw new Error('Invalid credentials');

    const isPasswordValid = await this.sessionService.validatePassword(
      password,
      customer.password,
    );
    if (!isPasswordValid) throw new Error('Invalid credentials');

    await this.createLoginRecordUseCase.execute(customer.id);
    await this.sessionService.setUserOnline(newEmail);
    return this.jwtService.createJwtToken(customer);
  }
}
