import { IsNotEmpty } from 'class-validator';
import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomDetail } from './room-detail.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => RoomDetail) // One Room has One RoomDetail
  @JoinColumn({ name: 'room_detail_id' }) // This column will store the foreign key in Room
  room_detail: RoomDetail;

  @CreateDateColumn({ type: 'timestamp' })
  @IsNotEmpty() 
  book_time: Date;

  @CreateDateColumn({ type: 'timestamp' }) 
  @IsNotEmpty()
  end_time: Date;
}