import { IsNotEmpty, MaxLength } from "class-validator"

export class ConsultNoteDto {

  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

}