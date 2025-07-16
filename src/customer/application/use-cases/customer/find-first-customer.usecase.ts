import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { CustomerDtoResponse } from '../../dto/customer.dto';

@Injectable()
export class FindFirstCustomerUseCase {
  constructor(private readonly CustomerReponsesitory: CustomerReponsesitory) {}

  async execute(email: string): Promise<CustomerDtoResponse> {
    const result = await this.CustomerReponsesitory.findFirst(email);
    return camelcaseKeys(result) as CustomerDtoResponse;
  }
}
