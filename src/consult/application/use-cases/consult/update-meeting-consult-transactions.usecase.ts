import { Injectable } from '@nestjs/common';
import { ConsultRepository } from 'src/consult/infrastructure/consult.repository';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class UpdateMeetingConsultTransactionsUseCase {
  constructor(private readonly consultRepository: ConsultRepository) {}

  async execute(id: string) {
    const result = await this.consultRepository.update(id);
    return camelcaseKeys(result);
  }
}
