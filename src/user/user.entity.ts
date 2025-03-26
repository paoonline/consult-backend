import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')  // Automatically generates UUID
  id: string;

  @Column({ nullable: true }) 
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  password: string
  
  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;  // Ensure email is unique

  @Column({ type: 'enum', enum: ['Admin', 'User', 'Guest'], default: 'User' })
  role: 'Admin' | 'User' | 'Guest'; 
}