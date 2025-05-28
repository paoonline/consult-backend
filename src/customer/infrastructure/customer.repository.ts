import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { IRepository } from 'src/utils/respository';

type CustomerProps = Omit<Customer, 'password'>
@Injectable()
export class CustomerRepository
  implements Omit<IRepository<CustomerProps, any>, 'logout'|'delete'>
{
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(): Promise<CustomerProps[]> {
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
    return result
  }

  async create(data: any) {
    // await this.prisma.login.create({
    //   data: { email_id: data.getEmail()},
    // });
  }

  async findOne(id: string): Promise<CustomerProps> {
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
    return result as CustomerProps
  }

  async findUnique(email: string): Promise<CustomerProps>{
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return customer as CustomerProps
  }

  delete(id: string): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }
}
