import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class RoomDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @Column({ unique: true })
  room_number: string;

  @Column({ type: 'enum', enum: ["Available", "Booked", "Maintenance"], default: 'Available' }) 
  @IsNotEmpty()
  room_status: string;

  @OneToOne(() => Room, (room) => room.room_detail) // One RoomDetail belongs to One Room
  room: Room;
}