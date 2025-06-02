import { Prisma } from "@prisma/client"
import { IsNotEmpty, MaxLength } from "class-validator"

export class CreateCustomerDto {
    @IsNotEmpty()
    data: Prisma.CustomerCreateInput
  
    @IsNotEmpty()
    @MaxLength(20)
    password: string
  
    @IsNotEmpty()
    skills: {id: string}[]
}