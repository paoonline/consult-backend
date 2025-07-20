// payment.type.ts
export type PaymentTransactionInput = {
  price: number;
  payment_date: Date;
  consult_transaction_id: string;
  consult_id: string;
  customer_id: string;
};

export interface LegacyPaymentInput {
  amount: number;
  paid_on: string; // ISO string
  cust_id: string;
}
