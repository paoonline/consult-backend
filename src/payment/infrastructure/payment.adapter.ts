// payment-adapter.ts

import { LegacyPaymentInput } from '../application/dto/payment.input';
import { PaymentBuilder } from '../domain/payment.builder';

export class LegacyPaymentAdapter {
  constructor(private readonly legacyInput: LegacyPaymentInput) {}

  toBuilder(): PaymentBuilder {
    return new PaymentBuilder()
      .setPrice(this.legacyInput.amount)
      .setPaymentDate(new Date(this.legacyInput.paid_on))
      .setCustomerId(this.legacyInput.cust_id);
  }
}
