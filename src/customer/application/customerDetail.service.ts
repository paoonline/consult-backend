import { Injectable } from '@nestjs/common';
import { IRepository } from 'src/utils/respository';
import { CustomerDetailRepository } from '../infrastructure/customer.detail.repository';
import { CustomerDetailDto, ICustomerDetail } from './dto/customer.dto';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { CustomerDetail } from '@prisma/client';

@Injectable()
export class CustomerDetailService implements IRepository<ICustomerDetail, CustomerDetailDto, number, null, ICustomerDetail> {
    constructor(
        private readonly customerDetailRepository: CustomerDetailRepository,

    ) { }
    async create(data: ICustomerDetail): Promise<ICustomerDetail> {
        const plainData = instanceToPlain(data);
        const snakeData = snakecaseKeys(plainData) as CustomerDetailDto;
        const result = await this.customerDetailRepository.create(snakeData)
        return result as ICustomerDetail
    }

    async findOne(id: string): Promise<ICustomerDetail> {
        const result = await this.customerDetailRepository.findOne(id)
        return camelcaseKeys(result as CustomerDetail ) as ICustomerDetail
    }

    async update(id: string, rate: number): Promise<ICustomerDetail> {
        const result = await this.customerDetailRepository.update(id, rate)
        return camelcaseKeys(result as CustomerDetail ) as ICustomerDetail
    }
}

