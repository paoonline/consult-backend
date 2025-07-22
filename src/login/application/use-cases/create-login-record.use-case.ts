import { Injectable } from '@nestjs/common';
import { LoginEntity } from 'src/login/domain/login.entity';
import { LoginRepository } from 'src/login/infrastructure/login.repository';
import { createFactory } from 'src/utils/factory';

@Injectable()
export class CreateLoginRecordUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(emailId: string): Promise<void> {
    const entity = createFactory(
      { email_id: emailId, login_date: new Date() },
      LoginEntity,
    );
    await this.loginRepository.create(entity);
  }
}
