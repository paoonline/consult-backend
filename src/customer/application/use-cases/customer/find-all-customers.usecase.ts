import { Injectable } from '@nestjs/common';
import { CustomerType } from '@prisma/client';
import camelcaseKeys from 'camelcase-keys';
import { CustomerReponsesitory } from 'src/customer/infrastructure/customer.repository';
import { SessionService } from 'src/services/Session/session.service';
import { CustomerDtoResponse } from '../../dto/customer.dto';

@Injectable()
export class FindAllCustomersUseCase {
  constructor(
    private readonly CustomerReponsesitory: CustomerReponsesitory,
    private readonly sessionService: SessionService,
  ) {}

  async execute(
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

    return resultMap.map((r) => camelcaseKeys(r)) as CustomerDtoResponse[];
  }
}
