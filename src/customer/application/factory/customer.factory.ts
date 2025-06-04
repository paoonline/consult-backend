
import { Prisma } from "@prisma/client";
import { CustomerEntity } from "../../domain/customer.entity";
import { CustomerProps } from "../../domain/data.vo";

export const createFactory = (data: Prisma.CustomerCreateInput, skills: { id: string }[], price?: number): CustomerEntity => {
  return new CustomerEntity(
    new CustomerProps(data), skills, price
  );
}
