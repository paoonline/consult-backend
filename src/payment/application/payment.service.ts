import { PaymentTransaction } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { IRepository } from 'src/utils/respository';
import { PaymentBuilder } from '../domain/payment.builder';
import { PaymentEntity } from '../domain/payment.entity';
import { PaymentRepository } from '../infrastructure/payment.repository';
import { IPaymentDto } from './dto/payment.dto';
import { Price } from '../domain/value-objects/price.vo';
import { PaymentDate } from '../domain/value-objects/payment-date.vo';
// import { LegacyPaymentInput } from './payment.type';
// import { LegacyPaymentAdapter } from '../infrastructure/payment.adapter';

@Injectable()
export class PaymentService
  implements IRepository<IPaymentDto, IPaymentDto, null, null, IPaymentDto>
{
  constructor(private readonly paymentRepository: PaymentRepository) {}
  async create(data: IPaymentDto): Promise<IPaymentDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as PaymentTransaction;

    const input = new PaymentBuilder()
      .setPaymentDate(snakeData.payment_date)
      .setPrice(snakeData.price)
      .setConsultId(snakeData.consult_id!)
      .setConsultTransactionId(snakeData.consult_transaction_id)
      .setCustomerId(snakeData.customer_id!)
      .build();

    const paymentEntity = new PaymentEntity(
      input,
      new Price(input.price),
      new PaymentDate(input.payment_date),
    );

    // const legacyData: LegacyPaymentInput = {
    //   amount: 1000,
    //   paid_on: '2025-07-03T13:00:00Z',
    //   cust_id: 'cus_abc123',
    // };

    // const builder = new LegacyPaymentAdapter(legacyData).toBuilder();
    // const newPayment = builder.build();

    const payment = await this.paymentRepository.create(
      paymentEntity.getData(),
    );
    return camelcaseKeys(payment) as IPaymentDto;
  }

  async findMany(id: string): Promise<IPaymentDto[]> {
    const payment = await this.paymentRepository.findMany(id);
    return camelcaseKeys(payment) as IPaymentDto[];
  }
}
