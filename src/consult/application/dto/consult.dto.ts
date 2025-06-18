import { TimeLimitType } from '@prisma/client';
import { IsDate, IsNotEmpty, MaxLength } from 'class-validator';

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
}
