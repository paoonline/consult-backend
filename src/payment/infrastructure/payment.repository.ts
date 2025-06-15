import { Injectable } from '@nestjs/common';
import { PaymentTransaction } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { PaymentEntity } from '../domain/payment.entity';

@Injectable()
export class PaymentRepository
  implements
  IRepository<
    PaymentTransaction, //return
    PaymentEntity, //params
    null,
    null,
    PaymentTransaction //create return
  > {
  constructor(private readonly prisma: PrismaService) { }

  create(data: PaymentEntity): Promise<PaymentTransaction> {
    return this.prisma.paymentTransaction.create({
      data: {
        price: data.getData().price,
        consult_transaction_id:  data.getData().consult_transaction_id,
      }
    })
  }
}
