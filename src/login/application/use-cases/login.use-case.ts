// src/login/application/use-cases/login.use-case.ts
import { Injectable } from '@nestjs/common';
import { FindFirstCustomerUseCase } from 'src/customer/application/use-cases/customer/find-first-customer.usecase';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { SessionService } from 'src/services/Session/session.service';
import { CreateLoginRecordUseCase } from './create-login-record.use-case';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly createLoginRecordUseCase: CreateLoginRecordUseCase,
    private readonly findFirstCustomerUseCase: FindFirstCustomerUseCase,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const newEmail = email.toLowerCase();
    const alreadyOnline = await this.sessionService.checkUserOnline(newEmail);
    if (alreadyOnline) throw new Error('Session was duplicated');

    const customer = await this.findFirstCustomerUseCase.execute(newEmail);
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
