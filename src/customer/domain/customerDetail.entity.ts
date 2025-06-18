import { ICustomerDetailEntity } from './customer.repository.interface';

export class CustomerDetailEntity {
  constructor(private readonly data: ICustomerDetailEntity) {}

  getData(): ICustomerDetailEntity {
    return this.data;
  }
}
