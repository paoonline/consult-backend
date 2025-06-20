import { Injectable } from '@nestjs/common';
import { CustomerDetail, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerDetailEntity } from '../domain/customerDetail.entity';
@Injectable()
export class CustomerDetailRepository
  implements
    IRepository<
      CustomerDetail,
      CustomerDetailEntity,
      CustomerDetailEntity,
      null,
      CustomerDetail
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CustomerDetailEntity,
    _?: string,
    tx?: Prisma.TransactionClient,
  ): Promise<CustomerDetail> {
    const client = tx ?? this.prisma;
    return client.customerDetail.create({
      data: {
        ...data.getData(),
      },
    });
  }

  async findOne(id: string): Promise<CustomerDetail | null> {
    return this.prisma.customerDetail.findFirst({
      include: {
        bookings: true,
      },
      where: { customer_id: id },
    });
  }

  async update(
    id: string,
    data: CustomerDetailEntity,
  ): Promise<CustomerDetail> {
    return this.prisma.customerDetail.update({
      where: {
        id: id,
      },
      data: {
        rate: Math.round(data.getData().rate ?? 0),
      },
    });
  }
}
