import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from 'src/customer/domain/entity/customer.entity';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { SessionService } from 'src/services/Session/session.service';
import { SkillService } from 'src/skill/application/skill-map.service';
import { createFactory } from 'src/utils/factory';
import { formatSnakeCase } from 'src/utils/format';
import { CustomerDto } from '../../dto/customer.dto';
import { Prisma } from '@prisma/client';
import { CustomerReponse } from '../../dto/customer';
import { CustomerBuilder } from '../../builder/customer.builder';
@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly CustomerReponsesitory: CustomerReponsesitory,
    private readonly skillService: SkillService,
    private readonly sessionService: SessionService,
  ) {}

  async execute(
    id: string,
    data: CustomerDto,
  ): Promise<CustomerReponse | null> {
    const input = new CustomerBuilder().fromCustomer(data, true).build();

    const snakeData = formatSnakeCase<
      Omit<CustomerDto, 'email' | 'skills' | 'price'>,
      Prisma.CustomerCreateInput & { price: number }
    >(input);

    const customer = await this.CustomerReponsesitory.findOne(id);
    if (!customer) return null;

    const skills = await this.skillService.skillMap(data.skills);
    if (data?.password) {
      const hashedPassword = await this.sessionService.hashPassword(
        data.password,
        10,
      );
      snakeData.password = hashedPassword;
    }

    snakeData.skills =
      skills as Prisma.SkillCreateNestedManyWithoutCustomersInput;
    snakeData.price = data?.price;

    const update = await this.CustomerReponsesitory.update(
      id,
      createFactory(snakeData, CustomerEntity),
    );
    if (!update) {
      throw new NotFoundException('Customer not found');
    }
    return update;
  }
}
