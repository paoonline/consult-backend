import { PaymentTransactionInput } from '../application/payment.type';

export class PaymentBuilder {
  private data: Partial<PaymentTransactionInput> = {};
  setPrice(price: number) {
    if (price <= 0) throw new Error('price must be positive');
    this.data.price = price;
    return this;
  }

  setPaymentDate(paymentDate: Date) {
    if (!paymentDate) throw new Error('paymentDate is required');
    this.data.payment_date = paymentDate;
    return this;
  }

  setConsultTransactionId(id: string) {
    if (!id) throw new Error('ConsultTransaction is required');
    this.data.consult_transaction_id = id;
    return this;
  }

  setConsultId(id: string) {
    if (!id) throw new Error('consult_id is required');
    this.data.consult_id = id;
    return this;
  }

  setCustomerId(id: string) {
    if (!id) throw new Error('customer_id is required');
    this.data.customer_id = id;
    return this;
  }

  build(): PaymentTransactionInput {
    if (
      !this.data.price ||
      !this.data.payment_date ||
      !this.data.consult_id ||
      !this.data.consult_transaction_id ||
      !this.data.customer_id
    ) {
      throw new Error('Missing required payment fields');
    }
    return this.data as PaymentTransactionInput; // ควรใช้ type ที่ตรง
  }
}
