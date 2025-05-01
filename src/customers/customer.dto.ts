import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export class CreateCustomerDto {

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @Column({ nullable: true })
  @MaxLength(255)
  description: string;

  @Column({ nullable: true })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @Column({ nullable: true })
  @MaxLength(20)
  phone_number: string;
}
