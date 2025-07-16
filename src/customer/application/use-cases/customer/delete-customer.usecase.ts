import { Injectable } from '@nestjs/common';
import { CustomerReponse } from 'src/customer/domain/customer.repository.interface';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private readonly CustomerReponsesitory: CustomerReponsesitory) {}

  async execute(id: string): Promise<CustomerReponse> {
    return this.CustomerReponsesitory.delete(id);
  }
}
