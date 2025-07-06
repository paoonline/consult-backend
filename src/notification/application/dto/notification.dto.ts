import { IsNotEmpty, MaxLength } from 'class-validator';

export class NotificationDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;
}
