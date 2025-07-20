import { TimeLimitType } from '@prisma/client';
import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

export class ConsultDto {
  @IsNotEmpty()
  timeList: TimeLimitType;

  @IsNotEmpty()
  @MaxLength(100)
  customerId: string;

  @IsNotEmpty()
  @MaxLength(100)
  consultId: string;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  isPass: boolean;

  @IsNotEmpty()
  @MaxLength(100)
  customerDetailId: string;

  @IsNotEmpty()
  @MaxLength(100)
  consultDetailId: string;
}

export type ConsultInput = Omit<ConsultDto, keyof ValidationMetadata>;

export type BookingPayloadItem = {
  customerDetailId: string;
  time: Date;
  consultTransactionId: string;
};
