import { Injectable } from '@nestjs/common';
import { PaymentTransaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { PaymentTransactionInput } from '../application/payment.type';

@Injectable()
export class PaymentRepository
  implements
    IRepository<
      Partial<PaymentTransaction>, //return
      PaymentTransactionInput, //params
      null,
      null,
      PaymentTransaction //create return
    >
{
  constructor(private readonly prisma: PrismaService) {}

  create(data: PaymentTransactionInput): Promise<PaymentTransaction> {
    return this.prisma.paymentTransaction.create({
      data: {
        consult_id: data.consult_id,
        customer_id: data.customer_id,
        price: data.price,
        consult_transaction_id: data.consult_transaction_id,
      },
    });
  }

  async findMany(id: string): Promise<Partial<PaymentTransaction>[]> {
    const data = await this.prisma.paymentTransaction.findMany({
      select: {
        payment_date: true,
        id: true,
        price: true,
        customer: {
          select: {
            email: true,
          },
        },
        consult: {
          select: {
            email: true,
          },
        },
      },
      where: {
        OR: [{ consult_id: id }, { customer_id: id }],
      },
    });
    return data;
  }
}
