import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';
import { CustomerDtoResponse } from '../application/customer.dto';

@Injectable()
export class CustomerRepository
  implements Omit<IRepository<CustomerDtoResponse, any>, 'logout'|'delete'>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<CustomerDtoResponse[]> {
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
    return result.map((r) => camelcaseKeys(r)) as CustomerDtoResponse[]
  }

  async create(data: any) {
    // await this.prisma.login.create({
    //   data: { email_id: data.getEmail()},
    // });
  }

  async findOne(id: string): Promise<CustomerDtoResponse> {
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
    return camelcaseKeys(result as Omit<Customer, 'skills'|'password'>) as CustomerDtoResponse
  }

  async findUnique(email: string): Promise<CustomerDtoResponse>{
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return camelcaseKeys(customer as Customer) as CustomerDtoResponse
  }

  delete(id: string): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
