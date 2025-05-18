import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerDto } from './customer.dto';
import { instanceToPlain } from 'class-transformer';
import snakecaseKeys from 'snakecase-keys';
import bcrypt from 'bcryptjs';
import camelcaseKeys from 'camelcase-keys';
@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async skillMap(skillsList: string[]) {
    const skills = await this.prisma.skill.findMany({
      where: {
        name: {
          in: skillsList,
        },
      },
      select: {
        id: true,
      },
    });
    const skillIds = skills.map((skill) => skill.id);
    return skillIds.map((id) => ({ id }));
  }

  async createCustomer(data: CustomerDto): Promise<Customer | null> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined
    };
    const plainData = instanceToPlain(newData);
    const snakeData = snakecaseKeys(plainData) as Prisma.CustomerCreateInput;
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const skills = await this.skillMap(data.skills);

    await this.prisma.customer.create({
      data: {
        ...snakeData,
        password: hashedPassword,
        skills: {
          connect: skills, // List of Skill IDs
        },
      },
    });

    const customer = await this.prisma.customer.findFirst({
      where: { email: data.email },
    });

    if (!customer) {
      throw new Error('Customer not found for this email');
    }

    //saveCustomerIdToCustomerDetail
    await this.prisma.customerDetail.create({
      data: {
        customer_id: customer.id,
        price: data.price,
      },
    });
    return customer;
  }
  async findAll(): Promise<Customer[]> {
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

    return result.map((r) =>
      camelcaseKeys(r, { deep: true }),
    ) as unknown as Customer[];
  }

  async findByCustomer(id: string): Promise<Customer | null> {
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
    return camelcaseKeys(
      result as Omit<Customer, 'password'>,
    ) as unknown as Customer;
  }

  delete(id: string): Promise<Customer> {
    return this.prisma.customer.delete({ where: { id } });
  }

  async updateCustomer(
    id: string,
    data: Omit<CustomerDto, 'email'>,
  ): Promise<Omit<Customer, 'password'> | null> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined
    };
    const plainData = instanceToPlain(newData);
    const snakeData = snakecaseKeys(plainData);
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return null; // Return null if the customer isn't found
    }
    const skills = await this.skillMap(data.skills);
    let hashedPassword;
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10);
    }

    const updated = await this.prisma.customer.update({
      where: { id },
      data: {
        ...snakeData,
        password: hashedPassword,
        skills: {
          set: skills,
        },
        customer_detail: {
          update: {
            price: data.price
          },
        }
      },
    });
    
    const { password, ...safeData } = updated;
    return safeData;
  }
}
