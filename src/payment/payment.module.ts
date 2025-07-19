import { Module } from '@nestjs/common';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { FindPaymentsByCustomerUseCase } from './application/use-cases/find-many-payment.use-case';
import { PaymentRepository } from './infrastructure/payment.repository';
import { PaymentController } from './payment.controller';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [
    PaymentRepository,
    CreatePaymentUseCase,
    FindPaymentsByCustomerUseCase,
  ],
  exports: [],
})
export class PaymentModule {}
