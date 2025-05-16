import { Injectable } from '@nestjs/common';
import { ConsultTransaction, Prisma } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultDto } from './consult.dto';

@Injectable()
export class ConsultService {
  constructor(private readonly prisma: PrismaService) {}
  async createConsult(data: ConsultDto): Promise<ConsultTransaction | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(
      plainData,
    ) as Prisma.ConsultTransactionCreateInput;

    const consult = await this.prisma.consultTransaction.create({
       data: snakeData,
    });

    const customerDetail = await this.prisma.customerDetail.findUnique({
      where: {customer_id: data.customerId}
    })
  
    if (!customerDetail) {
      throw new Error('CustomerDetail not found for this customerId');
    }

    await this.prisma.booking.create({
      data: {
        customer_detail_id: customerDetail.id,
        time: new Date()
      }
    })
    return consult
  }

  findAll(): Promise<ConsultTransaction[]> {
    return this.prisma.consultTransaction.findMany();
  }

  findByConsultTransaction(id: string): Promise<ConsultTransaction | null> {
    return this.prisma.consultTransaction.findUnique({
      where: { id },
    });
  }
}
