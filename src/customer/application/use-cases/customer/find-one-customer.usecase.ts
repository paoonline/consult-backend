import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { CustomerDtoResponse } from '../../dto/customer.dto';

@Injectable()
export class FindOneCustomerUseCase {
  constructor(private readonly CustomerReponsesitory: CustomerReponsesitory) {}

  async execute(email: string): Promise<CustomerDtoResponse> {
    const result = await this.CustomerReponsesitory.findOne(email);
    return camelcaseKeys(result) as CustomerDtoResponse;
  }
}
