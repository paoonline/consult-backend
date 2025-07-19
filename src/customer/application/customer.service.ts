import { Injectable } from '@nestjs/common';
import { CustomerType, Prisma } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { PrismaService } from 'prisma/prisma.service';
import { SessionService } from 'src/services/Session/session.service';
import { SkillService } from 'src/skillMap/application/skill-map.service';
import { createFactory } from 'src/utils/factory';
import { formatSnakeCase } from 'src/utils/format';
import { IRepository } from 'src/utils/respository';
import { CustomerEntity } from '../domain/entity/customer.entity';
import { CustomerReponse } from '../domain/customer.repository.interface';
import { CustomerReponsesitory } from '../infrastructure/customer.repository';
import { CreateCustomerDetailUseCase } from './use-cases/customerDetail/create-customer-detail.usecase';
import { CustomerDtoResponse, CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService
  implements
    IRepository<
      CustomerReponse | CustomerDtoResponse | null,
      CustomerDto,
      CustomerDto,
      null,
      CustomerReponse
    >
{
  constructor(
    private readonly sessionService: SessionService,
    private readonly CustomerReponsesitory: CustomerReponsesitory,
    private readonly skillService: SkillService,
    private readonly prisma: PrismaService,
    private readonly createCustomerDetailUseCase: CreateCustomerDetailUseCase,
  ) {}
  async create(data: CustomerDto): Promise<CustomerReponse> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined,
    };

    const hashedPassword = await this.sessionService.hashPassword(
      data.password,
      10,
    );
    const snakeData = formatSnakeCase<
      Omit<CustomerDto, 'skills' | 'price'>,
      Prisma.CustomerCreateInput & { price: number }
    >(newData);
    snakeData.password = hashedPassword;

    const skills = await this.skillService.skillMap(data.skills);
    if (skills.length === 0 && data.customerType !== CustomerType.CUSTOMER) {
      throw new Error('Skill is not match');
    }
    snakeData.skills =
      skills as Prisma.SkillCreateNestedManyWithoutCustomersInput;
    snakeData.price = data?.price;

    const result = await this.prisma.$transaction(async (tx) => {
      // Create customer
      await this.CustomerReponsesitory.create(
        createFactory(snakeData, CustomerEntity, tx),
      );

      // Retrieve customer (within transaction context)
      const customer = await this.CustomerReponsesitory.findFirst(
        data.email.toLowerCase(),
        tx,
      );

      if (!customer) {
        throw new Error('Customer not found for this email');
      }

      // Create customer detail
      await this.createCustomerDetailUseCase.execute(
        {
          customerId: customer.id,
          price: data?.price,
        },
        '',
        tx,
      );

      return customer;
    });
    return result;
  }

  async findAll(
    whereCustomerType: CustomerType,
  ): Promise<CustomerDtoResponse[]> {
    const result = await this.CustomerReponsesitory.findAll(
      whereCustomerType === CustomerType.CUSTOMER
        ? CustomerType.CONSULT
        : CustomerType.CUSTOMER,
    );
    const userKey = await this.sessionService.getAllUserOnline('online-users');

    const resultMap = result.map((res) => {
      const online = userKey[res.email as string] as string;
      return {
        ...res,
        onlineStatus: !!online,
      };
    });
    return resultMap.map((r) =>
      camelcaseKeys(r, { deep: true }),
    ) as CustomerDtoResponse[];
  }

  async findOne(email: string): Promise<CustomerDtoResponse> {
    const result = await this.CustomerReponsesitory.findOne(email);
    return camelcaseKeys(result) as CustomerDtoResponse;
  }

  async findFirst(email: string): Promise<CustomerDtoResponse> {
    const result = await this.CustomerReponsesitory.findFirst(email);
    return camelcaseKeys(result, { deep: true }) as CustomerDtoResponse;
  }

  delete(id: string): Promise<CustomerReponse> {
    return this.CustomerReponsesitory.delete(id);
  }

  async update(
    id: string,
    data: Omit<CustomerDto, 'email'>,
  ): Promise<CustomerReponse | null> {
    const newData = {
      ...data,
      skills: undefined,
      price: undefined,
    };
    const snakeData = formatSnakeCase<
      Omit<CustomerDto, 'email' | 'skills' | 'price'>,
      Prisma.CustomerCreateInput & { price: number }
    >(newData);
    const customer = await this.CustomerReponsesitory.findOne(id);

    if (!customer) {
      return null; // Return null if the customer isn't found
    }
    const skills = await this.skillService.skillMap(data.skills);
    let hashedPassword;
    if (data?.password) {
      hashedPassword = await this.sessionService.hashPassword(
        data.password,
        10,
      );
      snakeData.password = hashedPassword;
    }
    snakeData.skills =
      skills as Prisma.SkillCreateNestedManyWithoutCustomersInput;
    snakeData.price = data?.price;

    return this.CustomerReponsesitory.update(
      id,
      createFactory(snakeData, CustomerEntity),
    );
  }
}
