/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client';

export class CustomerEntity {
  constructor(
    private readonly data: Prisma.CustomerCreateInput & {
      skills: { id: string }[];
      price: number;
    },
  ) {}

  getPrice(): number | undefined {
    return this.data.price;
  }

  getDataForUpdate(): Omit<
    Prisma.CustomerUpdateInput,
    'skills' | 'customer_detail'
  > {
    const { skills, price, ...rest } = this.data;
    return rest;
  }

  getDataForCreate(): Prisma.CustomerCreateInput {
    const { skills, price, ...rest } = this.data;
    return rest;
  }

  getSkills(): { id: string }[] {
    return this.data.skills;
  }
}
