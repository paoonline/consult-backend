import { Customer } from '@prisma/client';

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export interface ICustomerDetailEntity {
  bookings?: never[];
  comments?: never[];
  customer_id: string;
  price?: number;
  rate?: number;
}

export type CustomerRepo = Omit<Customer, 'password'>;
