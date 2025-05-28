import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import camelcaseKeys from 'camelcase-keys';
import { instanceToPlain } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';
import snakecaseKeys from 'snakecase-keys';
import { SessionService } from 'src/services/Session/session.service';
import { CustomerDto, CustomerDtoResponse } from './customer.dto';
import { CustomerRepository } from '../infrastructure/customer.repository';
@Injectable()
export class CustomerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService,
    private readonly customerRepository: CustomerRepository
  ) {}

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
      price: undefined,
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
  async findAll(): Promise<CustomerDtoResponse[]> {
    const result = await this.customerRepository.findAll()
    const userKey = await this.sessionService.getAllUserOnline('online')

    const resultMap = result.map((res) => {
      const online = userKey[res.email]
      return {
        ...res,
        onlineStatus: !!online
      }
    })
    return resultMap.map((r) => camelcaseKeys(r)) as CustomerDtoResponse[]
  }

  async findByCustomer(email: string): Promise<CustomerDtoResponse | null> {
    const result = await this.customerRepository.findOne(email) 
    return camelcaseKeys(result) as CustomerDtoResponse
  }

  async findUnique(email: string): Promise<CustomerDtoResponse> {
    const result = await this.customerRepository.findUnique(email)
    return camelcaseKeys(result) as CustomerDtoResponse
  }

  delete(id: string): Promise<Customer> {
    return this.customerRepository.delete(id)
  }

  async updateCustomer(
    id: string,
    data: Omit<CustomerDto, 'email'>,
  ): Promise<Omit<Customer, 'password'> | null> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined,
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
            price: data.price,
          },
        },
      },
    });

    const { password, ...safeData } = updated;
    return safeData;
  }
}
