import { Injectable } from '@nestjs/common';

import { CustomerEntity } from 'src/customer/domain/customer.entity';
import { CustomerReponse } from 'src/customer/domain/customer.repository.interface';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { SessionService } from 'src/services/Session/session.service';
import { SkillService } from 'src/skillMap/application/skill-map.service';
import { createFactory } from 'src/utils/factory';
import { formatSnakeCase } from 'src/utils/format';
import { CustomerDto } from '../../dto/customer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly CustomerReponsesitory: CustomerReponsesitory,
    private readonly skillService: SkillService,
    private readonly sessionService: SessionService,
  ) {}

  async execute(
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

    return this.CustomerReponsesitory.update(
      id,
      createFactory(snakeData, CustomerEntity),
    );
  }
}
