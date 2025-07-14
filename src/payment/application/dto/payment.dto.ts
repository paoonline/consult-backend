export interface IPaymentDto {
  price: number;
  consultTransactionId: string;
  customerId: string;
  consultId: string;
  paymentDate?: Date;
}
