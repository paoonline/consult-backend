import { Prisma } from '@prisma/client';

export class CustomerProps {
  constructor(private readonly data: Prisma.CustomerCreateInput) {
    if (!data) throw new Error('Invalid data');
  }

  getValue() {
    return this.data;
  }
}
