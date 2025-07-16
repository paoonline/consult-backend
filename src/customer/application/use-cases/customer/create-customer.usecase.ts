import { Injectable } from '@nestjs/common';
import { CustomerType, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { CustomerReponse } from 'src/customer/domain/customer.repository.interface';
import { CustomerBuilder } from 'src/customer/domain/customer/customer.builder';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { SessionService } from 'src/services/Session/session.service';
import { SkillService } from 'src/skillMap/application/skill-map.service';
import { createFactory } from 'src/utils/factory';
import { CustomerDto } from '../../dto/customer.dto';
import { CustomerMapper } from '../../mapper/customer.mapper';
import { CreateCustomerDetailUseCase } from '../customerDetail/create-customer-detail.usecase';

@Injectable()
export class CreateCustomerUseCase {
  constructor(
    private readonly sessionService: SessionService,
    private readonly CustomerReponsesitory: CustomerReponsesitory,
    private readonly skillService: SkillService,
    private readonly prisma: PrismaService,
    private readonly createCustomerDetailUseCase: CreateCustomerDetailUseCase,
  ) {}

  async execute(data: CustomerDto): Promise<CustomerReponse> {
    const input = new CustomerBuilder()
      .setEmail(data.email)
      .setPassword(data.password)
      .setJob(data.job)
      .setAddress(data.address)
      .setPhoneNumber(data.phoneNumber)
      .setDescription(data.description)
      .setCustomerType(data.customerType)
      .build();

    const hashedPassword = await this.sessionService.hashPassword(
      data.password,
      10,
    );

    const snakeData = CustomerMapper.toPrisma(input);
    snakeData.password = hashedPassword;

    const skills = await this.skillService.skillMap(data.skills);
    if (skills.length === 0 && data.customerType !== CustomerType.CUSTOMER) {
      throw new Error('Skill is not match');
    }

    snakeData.skills =
      skills as Prisma.SkillCreateNestedManyWithoutCustomersInput;
    snakeData.price = input.price;

    const result = await this.prisma.$transaction(async (tx) => {
      await this.CustomerReponsesitory.create(
        createFactory(snakeData, CustomerEntity, tx),
      );

      const customer = await this.CustomerReponsesitory.findFirst(
        data.email.toLowerCase(),
        tx,
      );

      if (!customer) {
        throw new Error('Customer not found for this email');
      }

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
}
