import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class loginLogDto {
  @IsNotEmpty()
  @MaxLength(100)
  id: string;

  @IsNotEmpty()
  @MaxLength(100)
  emailId: string;

  @IsNotEmpty()
  loginDate: Date;
}

export class LoginDto {
  @IsString()
  @MaxLength(100)
  email: string;

  @MaxLength(20)
  password: string;
}
