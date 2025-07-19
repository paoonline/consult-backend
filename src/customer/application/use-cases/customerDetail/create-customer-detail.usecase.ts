import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { createFactory } from 'src/utils/factory';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';

import { CustomerDetailRepository } from 'src/customer/infrastructure/customer.detail.repository';
import { ICustomerDetail, CustomerDetailDto } from '../../dto/customer.dto';
import { CustomerDetailEntity } from 'src/customer/domain/entity/customerDetail.entity';

@Injectable()
export class CreateCustomerDetailUseCase {
  constructor(
    private readonly customerDetailRepository: CustomerDetailRepository,
  ) {}

  async execute(
    data: ICustomerDetail,
    other?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ICustomerDetail> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as CustomerDetailDto;

    const entity = createFactory(snakeData, CustomerDetailEntity, tx);

    if (!entity.isRated()) {
      throw new Error('Rate is over 5');
    }

    const result = await this.customerDetailRepository.create(entity);

    return result as ICustomerDetail;
  }
}
