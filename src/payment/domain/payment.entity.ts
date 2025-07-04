import { PaymentTransactionInput } from '../application/payment.type';

export class PaymentEntity {
  constructor(private readonly data: PaymentTransactionInput) {
    if (this.isSuspicious()) {
      throw new Error('Payment is suspicious');
    }
    if (this.isPriceZero()) {
      throw new Error('Price is zero');
    }
  }

  getDaysSincePayment(): number {
    const now = new Date();
    const diff = now.getTime() - this.data.payment_date.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  isSuspicious(): boolean {
    return this.data.price > 100000 || this.getDaysSincePayment() > 30;
  }

  isPriceZero(): boolean {
    return this.data.price < 0;
  }

  getData(): PaymentTransactionInput {
    return this.data;
  }
}
