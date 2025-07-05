import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/application/customer.service';
import { JwtService } from 'src/services/Jwt/jwt.service';
import { SessionService } from 'src/services/Session/session.service';
import { IRepository } from 'src/utils/respository';
import { LoginRepository } from '../infrastructure/login.repository';
import { loginLogDto } from './login.dto';
import { login } from '.prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { createFactory } from 'src/utils/factory';
import { LoginEntity } from '../domain/login.entity';
import { LoginBuilder } from '../domain/login.builder';
@Injectable()
export class LoginService
  implements Omit<IRepository<loginLogDto, string>, 'delete'>
{
  constructor(
    private readonly loginRepository: LoginRepository,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly customerService: CustomerService,
  ) {}

  createLoginRecord(emailId: string, date?: Date | null): LoginEntity {
    return createFactory(
      { email_id: emailId, login_date: date ?? new Date() },
      LoginEntity,
    );
  }

  async create(id: string): Promise<void> {
    const newLogin = this.createLoginRecord(id);
    const lastLoginFromDB = await this.loginRepository.findOne(id);
    const newLastLoginBuilder = new LoginBuilder()
      .setEmail(lastLoginFromDB?.email_id)
      .setLoginDate(lastLoginFromDB?.login_date)
      .build();

    // const newLastLoginBuilder = this.createLoginRecord(
    //   lastLoginFromDB?.email_id,
    //   lastLoginFromDB?.login_date,
    // );

    if (newLogin.isDuplicateOf(newLastLoginBuilder?.login_date)) {
      throw new Error('Duplicate login');
    }

    await this.loginRepository.create(this.createLoginRecord(id).getData());
  }

  async login(email: string, password: string): Promise<string> {
    // find user online
    const newEmail = email.toLowerCase();
    // const alreadyOnline = await this.sessionService.checkUserOnline(
    //   `${newEmail}`,
    // );

    // if (alreadyOnline) {
    //   throw new Error('Session was duplicated');
    // }

    // Find the user by email
    const customer = await this.customerService.findFirst(newEmail);
    if (!customer || !customer.password) {
      throw new Error('Invalid credentials');
    }

    // Compare the password with the hashed password
    const isPasswordValid = await this.sessionService.validatePassword(
      password,
      customer.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Create a login record
    await this.create(customer.id);
    // this.sessionService.setUserOnline(newEmail);

    return this.jwtService.createJwtToken(customer);
  }

  async findAll(): Promise<loginLogDto[]> {
    const result = await this.loginRepository.findAll();
    return camelcaseKeys(result) as loginLogDto[];
  }

  async findOne(id: string): Promise<loginLogDto | null> {
    const result = await this.loginRepository.findOne(id);
    return camelcaseKeys(result as login) as loginLogDto;
  }

  async logout(key: string): Promise<void> {
    await this.sessionService.logout(key);
  }
}
