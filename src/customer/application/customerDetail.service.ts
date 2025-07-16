import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/utils/respository';
import { CustomerDetailRepository } from '../infrastructure/customer.detail.repository';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { CustomerDetail, Prisma } from '@prisma/client';
import { CustomerDetailEntity } from '../domain/customerDetail.entity';
import { createFactory } from 'src/utils/factory';
import { ICustomerDetail, CustomerDetailDto } from './dto/customer.dto';

@Injectable()
export class CustomerDetailService
  implements
    IRepository<
      ICustomerDetail,
      CustomerDetailDto,
      number,
      null,
      ICustomerDetail
    >
{
  constructor(
    private readonly customerDetailRepository: CustomerDetailRepository,
  ) {}
  async create(
    data: ICustomerDetail,
    other?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ICustomerDetail> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as CustomerDetailDto;
    const result = await this.customerDetailRepository.create(
      createFactory(snakeData, CustomerDetailEntity, tx),
    );

    return result as ICustomerDetail;
  }

  async findOne(id: string): Promise<ICustomerDetail> {
    const result = await this.customerDetailRepository.findOne(id);
    return camelcaseKeys(result as CustomerDetail, {
      deep: true,
    }) as ICustomerDetail;
  }

  async update(id: string, rate: number): Promise<ICustomerDetail> {
    const data = createFactory(
      {
        customer_id: id,
        rate,
      },
      CustomerDetailEntity,
    );
    const result = await this.customerDetailRepository.update(id, data);
    return camelcaseKeys(result) as ICustomerDetail;
  }
}
