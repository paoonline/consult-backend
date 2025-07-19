import { Injectable } from '@nestjs/common';
import { CustomerDetail, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerDetailEntity } from '../domain/entity/customerDetail.entity';

@Injectable()
export class CustomerDetailRepository
  implements
    IRepository<
      Partial<CustomerDetail>,
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

  async findOne(id: string): Promise<Partial<CustomerDetail> | null> {
    return this.prisma.customerDetail.findFirst({
      select: {
        rate: true,
        id: true,
        price: true,
        bookings: {
          where: {
            time: { gte: new Date() },
          },
        },
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
