import { Customer } from "@prisma/client";

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export type CustomerRepo = Omit<Customer, 'password'>;