import { Injectable } from '@nestjs/common';
import { ConsultTransaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { ConsultEntity } from '../domain/consult.entity';

@Injectable()
export class ConsultRepository
  implements
    IRepository<
      ConsultTransaction,
      ConsultEntity,
      null,
      null,
      ConsultTransaction
    >
{
  constructor(private readonly prisma: PrismaService) {}

  async create(data: ConsultEntity): Promise<ConsultTransaction> {
    return this.prisma.consultTransaction.create({
      data: data.getData(),
    });
  }

  async findOne(id: string): Promise<ConsultTransaction | null> {
    return this.prisma.consultTransaction.findFirst({
      where: { id },
    });
  }

  async findAll(
    customerId?: string,
    consultId?: string,
  ): Promise<ConsultTransaction[]> {
    const whereParams =
      customerId && consultId
        ? {
            where: {
              customer_id: customerId,
              consult_id: consultId,
            },
          }
        : undefined;
    return this.prisma.consultTransaction.findMany(whereParams);
  }

  async findMany(
    customerId?: string,
    consultId?: string,
  ): Promise<ConsultTransaction[]> {
    return this.prisma.consultTransaction.findMany({
      where: {
        customer_id: customerId,
        consult_id: consultId,
      },
    });
  }
}
