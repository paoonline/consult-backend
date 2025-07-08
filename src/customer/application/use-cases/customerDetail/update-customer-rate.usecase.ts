import { Injectable } from '@nestjs/common';

import { createFactory } from 'src/utils/factory';
import camelcaseKeys from 'camelcase-keys';
import { CustomerDetailEntity } from 'src/customer/domain/customerDetail.entity';
import { CustomerDetailRepository } from 'src/customer/infrastructure/customer.detail.repository';
import { ICustomerDetail } from '../../dto/customer.dto';

@Injectable()
export class UpdateCustomerRateUseCase {
  constructor(
    private readonly customerDetailRepository: CustomerDetailRepository,
  ) {}

  async execute(id: string, rate: number): Promise<ICustomerDetail> {
    const entity = createFactory(
      {
        customer_id: id,
        rate,
      },
      CustomerDetailEntity,
    );

    const result = await this.customerDetailRepository.update(id, entity);
    return camelcaseKeys(result) as ICustomerDetail;
  }
}
