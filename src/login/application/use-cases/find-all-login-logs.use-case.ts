// src/login/application/use-cases/find-all-login-logs.use-case.ts
import { Injectable } from '@nestjs/common';
import { LoginRepository } from '../../infrastructure/login.repository';
import { loginLogDto } from '../login.dto';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindAllLoginLogsUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(): Promise<loginLogDto[]> {
    const result = await this.loginRepository.findAll();
    return camelcaseKeys(result) as loginLogDto[];
  }
}
