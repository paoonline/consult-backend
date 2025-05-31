import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CreateCustomerDto } from '../application/customer.create.dto';
import { CustomerEntity } from '../domain/customer.entity';

export interface IUpdateCustomer {
  skills: { id: string }[]
  price: number,
  password: string
}

export type CustomerRepo = Omit<Customer, 'password'>;
type createDetailCustomerRepo = {
  createDetailCustomer(customerId: string, price: number): Promise<void>;
};

@Injectable()
export class CustomerRepository
  implements
    Omit<IRepository<CustomerRepo, CreateCustomerDto, Prisma.CustomerCreateInput, IUpdateCustomer>, 'logout' | 'delete'>,
    createDetailCustomerRepo
{
  constructor(private readonly prisma: PrismaService) {}
  customerId: string;
  price: number;

  async findAll(): Promise<CustomerRepo[]> {
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
    });
    return result;
  }

  async create(params: CreateCustomerDto) {
    await this.prisma.customer.create({
      data: {
        ...params.data,
        password: params.password,
        skills: {
          connect: params.skills, // List of Skill IDs
        },
      },
    });
  }

  async update(
    id: string,
    data:  Prisma.CustomerCreateInput,
    other: IUpdateCustomer
  ): Promise<CustomerRepo> {

    const updated = await this.prisma.customer.update({
      where: { id },
      data: {
        ...data,
        password: other.password,
        skills: {
          set: other.skills,
        },
        customer_detail: {
          update: {
            price: other.price,
          },
        },
      },
    });
    
    return updated;
  }

  async createDetailCustomer(customerId: string, price: number) {
    await this.prisma.customerDetail.create({
      data: {
        customer_id: customerId,
        price,
      },
    });
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

  async findFirst(email: string): Promise<CustomerRepo> {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
    });
    return customer as CustomerRepo;
  }

  delete(id: string): Promise<CustomerRepo> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
