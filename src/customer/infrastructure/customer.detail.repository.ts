import { Injectable } from '@nestjs/common';
import { CustomerDetail, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerDetailDto } from '../application/dto/customer.dto';
@Injectable()
export class CustomerDetailRepository
  implements
  IRepository<
    CustomerDetail,
    CustomerDetailDto,
    number,
    null,
    CustomerDetail
  > {
  constructor(private readonly prisma: PrismaService) { }


  async create(data: CustomerDetailDto): Promise<CustomerDetail> {
    return this.prisma.customerDetail.create({
      data: {
        customer_id: data.customer_id,
        price: data.price,
      }
    })
  }

  async findOne(id: string): Promise<CustomerDetail | null> {
    return this.prisma.customerDetail.findFirst({
      where: { customer_id: id },
    });
  }

  async update(id: string, rate: number): Promise<CustomerDetail> {
    return this.prisma.customerDetail.update({
      where: {
        id: id,
      },
      data: {
        rate: Math.round(rate),
      },
    });
  }
}
