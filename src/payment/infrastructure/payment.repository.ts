import { Injectable } from '@nestjs/common';
import { PaymentTransaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { PaymentEntity } from '../domain/payment.entity';

@Injectable()
export class PaymentRepository
  implements
    IRepository<
      Partial<PaymentTransaction>, //return
      PaymentEntity, //params
      null,
      null,
      PaymentTransaction //create return
    >
{
  constructor(private readonly prisma: PrismaService) {}

  create(data: PaymentEntity): Promise<PaymentTransaction> {
    return this.prisma.paymentTransaction.create({
      data: data.getData(),
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
      orderBy: {
        payment_date: 'desc',
      },
    });
    return data;
  }
}
