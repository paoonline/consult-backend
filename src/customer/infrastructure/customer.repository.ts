import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerEntity } from '../domain/customer.entity';
import { CustomerReponse } from '../domain/customer.repository.interface';
import { CustomerType, Prisma } from '@prisma/client';

@Injectable()
export class CustomerReponsesitory
  implements
    IRepository<Partial<CustomerReponse>, CustomerEntity, CustomerEntity>
{
  constructor(private readonly prisma: PrismaService) {}
  customerId: string;
  price: number;

  // consult list
  async findAll(
    whereCustomerType: CustomerType,
  ): Promise<Partial<CustomerReponse>[]> {
    const result = await this.prisma.customer.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        job: true,
        description: true,
        skills: true,
        email: true,
        customer_detail: {
          select: {
            bookings: {
              where: {
                time: { gte: new Date() },
              },
            },
            id: true,
            price: true,
            rate: true,
          },
        },
      },
      where: {
        customer_type: whereCustomerType,
      },
      orderBy: {
        customer_detail: {
          rate: 'desc',
        },
      },
    });
    return result.map((r) => {
      const { ...rest } = r;
      return {
        ...rest,
        skills: r.skills.map((r) => r.name),
      };
    });
  }

  async create(
    params: CustomerEntity,
    _?: string,
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;
    await client.customer.create({
      data: {
        ...params.getDataForCreate(),
        skills: {
          connect: params.getSkills(), // List of Skill IDs
        },
      },
    });
  }

  async update(id: string, data: CustomerEntity): Promise<CustomerReponse> {
    const updated = await this.prisma.customer.update({
      where: { id },
      data: {
        ...data.getDataForUpdate(),
        skills: {
          set: data.getSkills(),
        },
        customer_detail: {
          update: {
            price: data.getPrice(),
          },
        },
      },
    });

    return updated;
  }

  async findOne(id: string): Promise<Partial<CustomerReponse>> {
    const result = await this.prisma.customer.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        job: true,
        description: true,
        skills: true,
        email: true,
        customer_detail: {
          select: {
            bookings: true,
            id: true,
            price: true,
            rate: true,
          },
        },
      },
    });
    return result as Partial<CustomerReponse>;
  }

  async findFirst(
    email: string,
    tx?: Prisma.TransactionClient,
  ): Promise<CustomerReponse> {
    const client = tx ?? this.prisma;
    const customer = await client.customer.findUnique({
      where: { email },
      include: {
        customer_detail: true,
      },
    });
    return customer as CustomerReponse;
  }

  delete(id: string): Promise<CustomerReponse> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
