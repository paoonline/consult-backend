import { Injectable } from '@nestjs/common';
import { PaymentTransaction } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { PaymentBuilder } from 'src/payment/domain/payment.builder';
import { PaymentEntity } from 'src/payment/domain/payment.entity';
import { PaymentRepository } from 'src/payment/infrastructure/payment.repository';
import { IPaymentDto } from '../dto/payment.dto';

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(data: IPaymentDto): Promise<IPaymentDto> {
    const snakeData = snakecaseKeys(
      instanceToPlain(data),
    ) as PaymentTransaction;

    const input = new PaymentBuilder()
      .setPaymentDate(snakeData.payment_date)
      .setPrice(snakeData.price)
      .setConsultId(snakeData.consult_id!)
      .setConsultTransactionId(snakeData.consult_transaction_id)
      .setCustomerId(snakeData.customer_id!)
      .build();

    const paymentEntity = new PaymentEntity(input);

    const payment = await this.paymentRepository.create(
      paymentEntity.getData(),
    );
    return camelcaseKeys(payment) as IPaymentDto;
  }
}
