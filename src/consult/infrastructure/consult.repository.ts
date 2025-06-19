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
      { isPass?: boolean },
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

  async update(id: string): Promise<ConsultTransaction> {
    return this.prisma.consultTransaction.update({
      where: { id },
      data: {
        is_pass: true,
      },
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

  async findMany(customerId?: string): Promise<ConsultTransaction[]> {
    return this.prisma.consultTransaction.findMany({
      include: {
        customer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        consult: {
          select: {
            customer_detail: true,
            id: true,
            first_name: true,
            last_name: true,
          },
        },
      },
      where: {
        is_pass: false,
        OR: [{ consult_id: customerId }, { customer_id: customerId }],
        end_date: {
          gt: new Date(), // Filter where end_date is in the future
        },
      },
    });
  }
}
