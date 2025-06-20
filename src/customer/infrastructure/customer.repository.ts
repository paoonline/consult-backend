import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerEntity } from '../domain/customer.entity';
import { CustomerRepo } from '../domain/customer.repository.interface';
import { CustomerType, Prisma } from '@prisma/client';

@Injectable()
export class CustomerRepository
  implements IRepository<CustomerRepo, CustomerEntity, CustomerEntity>
{
  constructor(private readonly prisma: PrismaService) {}
  customerId: string;
  price: number;

  // consult list
  async findAll(whereCustomerType: CustomerType): Promise<CustomerRepo[]> {
    const result = await this.prisma.customer.findMany({
      include: {
        skills: true,
        customer_detail: {
          include: {
            bookings: true,
          },
        },
      },
      omit: {
        password: true,
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
      return {
        ...r,
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

  async update(id: string, data: CustomerEntity): Promise<CustomerRepo> {
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

  async findOne(id: string): Promise<CustomerRepo> {
    const result = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        skills: true,
        customer_detail: {
          include: {
            bookings: true,
          },
        },
      },
      omit: {
        password: true,
      },
    });
    return result as CustomerRepo;
  }

  async findFirst(
    email: string,
    tx?: Prisma.TransactionClient,
  ): Promise<CustomerRepo> {
    const client = tx ?? this.prisma;
    const customer = await client.customer.findUnique({
      where: { email },
    });
    return customer as CustomerRepo;
  }

  delete(id: string): Promise<CustomerRepo> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
