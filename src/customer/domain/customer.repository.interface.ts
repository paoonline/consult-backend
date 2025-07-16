import { Customer } from '@prisma/client';
import { CustomerDto } from '../application/dto/customer.dto';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export interface ICustomerDetailEntity {
  // bookings?: IBooking[];
  // comments?: ConsultComment[];
  customer_id: string;
  price?: number;
  rate?: number;
}

export type CustomerReponse = Omit<Customer, 'password'>;

export type CustomerInput = Omit<CustomerDto, keyof ValidationMetadata>;
