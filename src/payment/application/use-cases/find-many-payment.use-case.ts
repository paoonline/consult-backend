import { Injectable } from '@nestjs/common';
import camelcaseKeys from 'camelcase-keys';
import { PaymentRepository } from 'src/payment/infrastructure/payment.repository';
import { IPaymentDto } from '../dto/payment.dto';

@Injectable()
export class FindPaymentsByCustomerUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(customerId: string): Promise<IPaymentDto[]> {
    const payments = await this.paymentRepository.findMany(customerId);
    return camelcaseKeys(payments) as IPaymentDto[];
  }
}
