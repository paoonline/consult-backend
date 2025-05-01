import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { Room } from 'src/room/room.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ unique: true, nullable: true  })
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

  @OneToMany(() => Room, (room) => room.customer)
  rooms: Room[];
}