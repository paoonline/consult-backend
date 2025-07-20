import { Injectable } from '@nestjs/common';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { CustomerReponse } from '../../dto/customer';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private readonly CustomerReponsesitory: CustomerReponsesitory) {}

  async execute(id: string): Promise<CustomerReponse> {
    return this.CustomerReponsesitory.delete(id);
  }
}
