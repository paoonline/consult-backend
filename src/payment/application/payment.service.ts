import { PaymentTransaction } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import { createFactory } from 'src/utils/factory';
import { IRepository } from 'src/utils/respository';
import { PaymentEntity } from '../domain/payment.entity';
import { PaymentRepository } from '../infrastructure/payment.repository';
import { IPaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService
  implements IRepository<IPaymentDto, IPaymentDto, null, null, IPaymentDto>
{
  constructor(private readonly paymentRepository: PaymentRepository) {}
  async create(data: IPaymentDto): Promise<IPaymentDto> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as PaymentTransaction;

    const payment = await this.paymentRepository.create(
      createFactory(snakeData, PaymentEntity),
    );
    return camelcaseKeys(payment as Partial<PaymentTransaction>) as IPaymentDto;
  }

  async findMany(id: string): Promise<IPaymentDto[]> {
    const payment = await this.paymentRepository.findMany(id);
    return camelcaseKeys(payment) as IPaymentDto[];
  }
}
