import { IsNotEmpty, MaxLength } from "class-validator"

export class ConsultNoteDto {

  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

}


export class ConsultNoteResponseDto {

  @IsNotEmpty()
  @MaxLength(100)
  consult_transaction_id: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

}