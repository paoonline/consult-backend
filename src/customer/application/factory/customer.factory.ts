
import { Prisma } from "@prisma/client";
import { CustomerEntity } from "../../domain/customer.entity";
import { validateData } from "../../domain/data.vo";

 export const createFactory = (data: Prisma.CustomerCreateInput): CustomerEntity => {
      return new CustomerEntity(
        new validateData(data)
      );
    }
