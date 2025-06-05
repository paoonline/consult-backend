import { Prisma } from '@prisma/client';

export class CustomerEntity {
  constructor(
    private readonly data: Prisma.CustomerCreateInput & { skills: { id: string }[], price: number },
  ) { }

  getPrice(): number | undefined {
    return this.data.price;
  }

  getData(): Prisma.CustomerCreateInput {
    const newData = {
      ...this.data,
      price: undefined,
      skill: undefined
    }
    return newData
  }

  getSkills(): { id: string }[] {
    return this.data.skills;
  }
}
