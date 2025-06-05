import { Injectable } from '@nestjs/common';
import { CustomerDetail, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { SessionService } from 'src/services/Session/session.service';
import { SkillService } from 'src/skill/application/skill.service';
import { formatSnakeCase } from 'src/utils/format';
import { IRepository } from 'src/utils/respository';
import { CustomerRepo } from '../domain/customer.repository.interface';
import { CustomerRepository } from '../infrastructure/customer.repository';
import { CustomerDetailService } from './customerDetail.service';
import { CustomerDto, CustomerDtoResponse, ICustomerDetail } from './dto/customer.dto';
import { createFactory } from 'src/utils/factory';
import { CustomerEntity } from '../domain/customer.entity';

@Injectable()
export class CustomerService implements IRepository<CustomerRepo | CustomerDtoResponse | null, CustomerDto, CustomerDto, null, CustomerRepo> {
  constructor(
    private readonly sessionService: SessionService,
    private readonly customerRepository: CustomerRepository,
    private readonly skillService: SkillService,
    private readonly customerDetailService: CustomerDetailService
  ) { }
  async create(data: CustomerDto): Promise<CustomerRepo> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined,
    };

    const hashedPassword = await this.sessionService.hashPassword(data.password, 10)
    const snakeData = formatSnakeCase<Omit<CustomerDto, 'skills' | 'price'>, Prisma.CustomerCreateInput & {price:number}>(newData)
    snakeData.password = hashedPassword

    const skills = await this.skillService.skillMap(data.skills);
    snakeData.skills = skills as Prisma.SkillCreateNestedManyWithoutCustomersInput
    snakeData.price = data?.price

    await this.customerRepository.create(createFactory(snakeData, CustomerEntity))
    const customer = await this.customerRepository.findFirst(data.email)

    if (!customer) {
      throw new Error('Customer not found for this email');
    }

    //saveCustomerIdToCustomerDetail
    await this.customerDetailService.create({
      customerId: customer.id, price: data?.price
    })
    return customer
  }

  async findCustomerDetail(id: string): Promise<ICustomerDetail | null> {
    const result = await this.customerDetailService.findOne(id)
    return camelcaseKeys(result as CustomerDetail) as ICustomerDetail
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

  async findOne(email: string): Promise<CustomerDtoResponse> {
    const result = await this.customerRepository.findOne(email)
    return camelcaseKeys(result) as CustomerDtoResponse
  }

  async findFirst(email: string): Promise<CustomerDtoResponse> {
    const result = await this.customerRepository.findFirst(email)
    return camelcaseKeys(result) as CustomerDtoResponse
  }

  delete(id: string): Promise<CustomerRepo> {
    return this.customerRepository.delete(id)
  }

  async update(
    id: string,
    data: Omit<CustomerDto, 'email'>,
  ): Promise<CustomerRepo | null> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined,
    };
    const snakeData = formatSnakeCase<Omit<CustomerDto, 'email' | 'skills' | 'price'>, Prisma.CustomerCreateInput & {price:number}>(newData)
    const customer = await this.customerRepository.findOne(id);

    if (!customer) {
      return null; // Return null if the customer isn't found
    }
    const skills = await this.skillService.skillMap(data.skills);
    let hashedPassword;
    if (data?.password) {
      hashedPassword = await this.sessionService.hashPassword(data.password, 10)
      snakeData.password = hashedPassword
    }
    snakeData.skills = skills as Prisma.SkillCreateNestedManyWithoutCustomersInput
    snakeData.price = data?.price

    return this.customerRepository.update(id, createFactory(snakeData, CustomerEntity))
  }
}

