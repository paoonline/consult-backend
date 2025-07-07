import { PaymentTransactionInput } from '../application/payment.type';
import { PaymentSuspiciousError } from './payment.error';
import { PaymentDate } from './value-objects/payment-date.vo';
import { Price } from './value-objects/price.vo';

export class PaymentEntity {
  constructor(
    private readonly data: PaymentTransactionInput,
    private readonly price: Price,
    private readonly paymentDate: PaymentDate,
  ) {
    if (this.isSuspicious()) {
      throw new PaymentSuspiciousError();
    }
  }

  isSuspicious(): boolean {
    return this.price.isGreaterThan(100000) || this.paymentDate.isOlderThan(30);
  }

  getDTO(): PaymentTransactionInput {
    return {
      ...this.data,
      price: this.price.getValue(),
      payment_date: this.paymentDate.getValue(),
    };
  }
}
