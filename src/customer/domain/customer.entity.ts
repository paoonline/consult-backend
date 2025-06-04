import { Prisma } from '@prisma/client';
import { CustomerProps } from './data.vo';

export class CustomerEntity {
  constructor(
    private readonly data: CustomerProps,
    private readonly skills: { id: string }[],
    private readonly price?: number,
  ) {}

  getPrice(): number | undefined {
    return this.price;
  }

  getData(): Prisma.CustomerCreateInput {
    return this.data.getValue();
  }

  getSkills(): { id: string }[] {
    return this.skills;
  }
}
