import { IsNotEmpty, MaxLength } from "class-validator"

export class ConsultCommentDto {

  @IsNotEmpty()
  @MaxLength(100)
  consultTransactionId: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

  @IsNotEmpty()
  @MaxLength(1)
  rate: number

  @IsNotEmpty()
  @MaxLength(100)
  customerDetailId: string

}


export class ConsultCommentDtoRepository {
  @IsNotEmpty()
  @MaxLength(100)
  consult_transaction_id: string

  @IsNotEmpty()
  @MaxLength(255)
  description: string

  @IsNotEmpty()
  @MaxLength(1)
  rate: number

  @IsNotEmpty()
  @MaxLength(100)
  customer_detail_id: string

  comment_date: Date
}
