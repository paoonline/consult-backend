import { IsNotEmpty, MaxLength } from "class-validator"

export class ConsultNotificationDto {
  @IsNotEmpty()
  @MaxLength(100)
  title: string

  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string

  @IsNotEmpty()
  @MaxLength(100)
  deviceToken: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

}