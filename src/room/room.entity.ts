import { IsNotEmpty } from 'class-validator';
import { Customer } from 'src/customers/customer.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomDetail } from './room-detail.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => RoomDetail) // One Room has One RoomDetail
  @JoinColumn({ name: 'room_detail_id' }) // This column will store the foreign key in Room
  room_detail: RoomDetail;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  book_time: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  end_time: Date | null;

  @ManyToOne(() => Customer, { nullable: true })
  @JoinColumn({ name: 'customer_id' }) // correct FK column name
  customer: Customer | null;
}