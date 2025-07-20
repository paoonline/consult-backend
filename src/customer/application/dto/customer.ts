import { Customer } from '@prisma/client';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import { CustomerDto } from './customer.dto';

export interface IConsultComment {
  description: string;
  commentDate: Date;
  rate: number;
  consultTransactionId: string;
  customerDetailId: string;
}
export interface IBooking {
  time: Date;
  customerDetailId?: string;
}

export interface ISkill {
  name: string;
}

export interface IUpdateCustomer {
  skills: { id: string }[];
  price: number;
  password: string;
}

export interface ICustomerDetailInput {
  // bookings?: IBooking[];
  // comments?: ConsultComment[];
  customer_id: string;
  price?: number;
  rate?: number;
}

export type CustomerReponse = Omit<Customer, 'password'>;

export type CustomerInput = Omit<CustomerDto, keyof ValidationMetadata>;
