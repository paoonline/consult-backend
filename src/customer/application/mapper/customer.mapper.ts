import { Prisma } from '@prisma/client';

import { formatSnakeCase } from 'src/utils/format';
import { CustomerInput } from '../dto/customer';

export class CustomerMapper {
  static toPrisma(
    input: CustomerInput,
  ): Prisma.CustomerCreateInput & { price: number } {
    const base = formatSnakeCase<
      CustomerInput,
      Prisma.CustomerCreateInput & { price: number }
    >(input);

    return base;
  }
}
