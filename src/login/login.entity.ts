import { Users } from "src/user/user.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, { nullable: false }) // Foreign key reference
  user: Users;

  @CreateDateColumn({ type: 'timestamp' }) // Auto sets the current timestamp
  login_time: Date;
}