import { Prisma } from '@prisma/client';

export class ConsultEntity {
  constructor(private readonly data: Prisma.ConsultTransactionCreateInput) {}

  getData(): Prisma.ConsultTransactionCreateInput {
    return this.data;
  }
}
