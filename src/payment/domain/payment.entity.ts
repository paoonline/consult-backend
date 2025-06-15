import { PaymentTransaction } from "@prisma/client";

export class PaymentEntity {
  constructor(
    private readonly data: PaymentTransaction,
  ) {}

  getData(): PaymentTransaction {
    return this.data;
  }
}
