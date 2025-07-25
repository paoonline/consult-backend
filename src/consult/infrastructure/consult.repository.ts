import { Injectable } from '@nestjs/common';
import { ConsultTransaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { ConsultEntity } from '../domain/entity/consult.entity';
import { ConsultDto } from '../application/dto/consult.dto';
import { truncateTime } from 'src/utils/time';

@Injectable()
export class ConsultRepository
  implements
    IRepository<
      Partial<ConsultTransaction>,
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

  async delete(id: string): Promise<ConsultTransaction> {
    return this.prisma.consultTransaction.delete({
      where: { id },
    });
  }

  async findOne(id: string): Promise<ConsultTransaction | null> {
    return this.prisma.consultTransaction.findFirst({
      where: { id },
    });
  }

  async findFirst(data: ConsultDto): Promise<ConsultTransaction | null> {
    const newStartTime = truncateTime(data.startDate);
    const newEndTime = truncateTime(data.endDate);

    return this.prisma.consultTransaction.findFirst({
      where: {
        consult_id: data.consultId,
        customer_id: { not: data.customerId },
        end_date: { lte: newStartTime },
        start_date: { gte: newEndTime },
      },
    });
  }

  // history
  async findAll(customerId?: string): Promise<Partial<ConsultTransaction>[]> {
    return this.prisma.consultTransaction.findMany({
      select: {
        start_date: true,
        end_date: true,
        comment: {
          select: {
            description: true,
            rate: true,
          },
        },
        note: {
          select: {
            description: true,
            note_date: true,
          },
        },
        customer: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        consult: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
      where: {
        is_pass: true,
        OR: [{ consult_id: customerId }, { customer_id: customerId }],
        //refactor
        // end_date: {
        //   lt: new Date(), // Filter where end_date is in the future
        // },
      },
      orderBy: {
        start_date: 'asc',
      },
    });
  }

  //booking
  async findMany(customerId?: string): Promise<Partial<ConsultTransaction>[]> {
    return this.prisma.consultTransaction.findMany({
      select: {
        id: true,
        start_date: true,
        end_date: true,
        customer: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
          },
        },
        consult: {
          select: {
            customer_detail: {
              select: {
                id: true,
              },
            },
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
      orderBy: {
        start_date: 'asc',
      },
    });
  }
}
