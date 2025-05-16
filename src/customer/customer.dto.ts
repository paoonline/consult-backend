// src/customer/dto/update-customer.dto.ts
import {
  // IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  MaxLength,
  IsArray,
} from 'class-validator';
import { CustomerType } from '@prisma/client';

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
  price: number
}
