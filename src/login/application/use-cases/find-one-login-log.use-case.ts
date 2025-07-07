// src/login/application/use-cases/find-one-login-log.use-case.ts
import { Injectable } from '@nestjs/common';
import { LoginRepository } from '../../infrastructure/login.repository';
import { loginLogDto } from '../login.dto';
import camelcaseKeys from 'camelcase-keys';
import { login } from '@prisma/client';

@Injectable()
export class FindOneLoginLogUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(id: string): Promise<loginLogDto | null> {
    const result = await this.loginRepository.findOne(id);
    return camelcaseKeys(result as login) as loginLogDto;
  }
}
