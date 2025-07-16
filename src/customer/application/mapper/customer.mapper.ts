import { Prisma } from '@prisma/client';
import { CustomerInput } from 'src/customer/domain/customer.repository.interface';
import { formatSnakeCase } from 'src/utils/format';

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
