import { IsNotEmpty, MaxLength } from "class-validator";

export class loginLogDto {

  @IsNotEmpty()
  @MaxLength(100)
  id: string

  @IsNotEmpty()
  @MaxLength(100)
  emailId: string

  @IsNotEmpty()
  loginDate: Date

}