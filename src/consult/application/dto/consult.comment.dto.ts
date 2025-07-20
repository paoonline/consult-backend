import { IsNotEmpty, MaxLength } from 'class-validator';

export class ConsultCommentDto {
  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string;

  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsNotEmpty()
  @MaxLength(1)
  rate: number;

  @IsNotEmpty()
  @MaxLength(100)
  customerDetailId: string;
}
