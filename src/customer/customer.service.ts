import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerDto } from './dto/customer.dto';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import bcrypt from 'bcryptjs';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(data: CustomerDto): Promise<Customer | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData) as Prisma.CustomerCreateInput;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    return this.prisma.customer.create({  data: {...snakeData, password :hashedPassword} });
  }

  findAll(): Promise<Customer[]> {
    return this.prisma.customer.findMany();
  }

  findByCustomer(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  delete(id: string): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }

  async updateCustomer(
    id: string,
    data: Omit<CustomerDto, 'password'| 'email'>,
  ): Promise<Customer | null> {
    const plainData = instanceToPlain(data);
    const snakeData = snakecaseKeys(plainData);
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    
    if (!customer) {
      return null; // Return null if the customer isn't found
    }

    return this.prisma.customer.update({
      where: { id },
      data: snakeData as CustomerDto,
    });
  }
}
