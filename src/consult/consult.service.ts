import { Injectable } from '@nestjs/common';
import { ConsultTransaction, Prisma } from '@prisma/client';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { ConsultDto } from './consult.dto';
import camelcaseKeys from 'camelcase-keys';

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
      where: { customer_id: data.customerId },
    });

    const customerConsultDetail = await this.prisma.customerDetail.findUnique({
      where: { customer_id: data.consultId },
    });

    if (!customerDetail) {
      throw new Error(`CustomerDetail not found for customerId: ${data.customerId}`);
    }
  
    if (!customerConsultDetail) {
      throw new Error(`CustomerDetail not found for consultId: ${data.consultId}`);
    }

    await this.prisma.booking.createMany({
      data: [
        {
          customer_detail_id: customerDetail.id,
          time: data.startDate,
        },
        {
          customer_detail_id: customerConsultDetail.id,
          time: data.startDate,
        },
      ],
    });

    await this.prisma.paymentTransaction.create({
      data: {
        price: customerConsultDetail.price,
        consult_transaction_id: consult.id
      }
    })
    return consult;
  }

  async findAll(): Promise<ConsultDto[]> {
    const transactions = await this.prisma.consultTransaction.findMany()
    return transactions.map((item) => camelcaseKeys(item));
  }

  async findByConsultTransaction(
    customerId: string,
    consultId: string,
  ): Promise<ConsultDto[] | null> {
    const transactions = await this.prisma.consultTransaction.findMany({
      where: {
        customer_id: customerId,
        consult_id: consultId,
      },
    });
    return camelcaseKeys(transactions)
  }

  async meeting (customerId: string, consultId: string):Promise<string> {
    await this.prisma.booking.deleteMany({
      where: {
        id: { in: [customerId, consultId] },
      },
    });
    return 'Success'
  }
}
