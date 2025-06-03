import { Customer } from "@prisma/client";
import { ICustomerDetail } from "../application/dto/customer.dto";

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export type CustomerRepo = Omit<Customer, 'password'>;
