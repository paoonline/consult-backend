import { Injectable } from '@nestjs/common';
import { CustomerDetail } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { CustomerDetailRepository } from 'src/customer/infrastructure/customer.detail.repository';
import { ICustomerDetail } from '../../dto/customer.dto';

@Injectable()
export class FindOneCustomerDetailUseCase {
  constructor(
    private readonly customerDetailRepository: CustomerDetailRepository,
  ) {}

  async execute(id: string): Promise<ICustomerDetail> {
    const result = await this.customerDetailRepository.findOne(id);
    return camelcaseKeys(result as CustomerDetail, {
      deep: true,
    }) as ICustomerDetail;
  }
}
