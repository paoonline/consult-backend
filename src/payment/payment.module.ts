import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentRepository } from './infrastructure/payment.repository';
import { PaymentController } from './payment.controller';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { FindPaymentsByCustomerUseCase } from './application/use-cases/find-many-payment.use-case';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PrismaService,
    PaymentRepository,
    CreatePaymentUseCase,
    FindPaymentsByCustomerUseCase,
  ],
  exports: [],
})
export class PaymentModule {}
