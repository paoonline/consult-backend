import { Injectable } from '@nestjs/common';
import { ConsultRepository } from 'src/consult/infrastructure/consult.repository';
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class FindAllConsultTransactionsUseCase {
  constructor(private readonly consultRepository: ConsultRepository) {}

  async execute(customerId?: string) {
    const transactions = await this.consultRepository.findAll(customerId);
    return transactions.map((item) => camelcaseKeys(item, { deep: true }));
  }
}
