import { Customer } from "@prisma/client";

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export type CustomerRepo = Omit<Customer, 'password'>;

export type createDetailCustomerRepo = {
  createDetailCustomer(customerId: string, price: number): Promise<void>;
  updateDetailCustomer(customerId: string, avg: number): Promise<void>
};