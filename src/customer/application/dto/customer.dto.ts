// src/customer/dto/update-customer.dto.ts
import { CustomerType } from '@prisma/client';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';
import { ISkill, IBooking, IConsultComment } from './customer';

export class CustomerDto {
  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(50)
  job: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[];

  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsEnum(CustomerType)
  customerType: CustomerType;

  @IsString()
  @MaxLength(100)
  profileImage?: string;

  @MaxLength(100)
  price: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class CustomerDtoResponse {
  id: string;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsString()
  @MaxLength(100)
  password?: string;

  @IsString()
  @MaxLength(50)
  job: string;

  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @MaxLength(10)
  phoneNumber: string;

  @IsString()
  @MaxLength(255)
  description: string;

  @IsEnum(CustomerType)
  customerType: CustomerType;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsString()
  @MaxLength(100)
  profileImage?: string;

  @IsArray()
  skills?: ISkill[];

  customerDetail?: ICustomerDetail;

  onlineStatus: boolean;
  verifyEmail: boolean;
}

export interface CustomerDetailDto {
  customer_id: string;
  price: number;
}

export interface ICustomerDetail {
  id?: string;
  rate?: number;
  customerId?: string;
  price: number;
  bookings?: IBooking[];
  comments?: IConsultComment[];
}
