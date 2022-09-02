import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hrs } from '../hrs/hrs.entity';
import { Students } from '../students/students.entity';
import { Role } from '../role/role.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column()
  pwdHash: string;

  @Column({
    default: null,
    nullable: true,
    select: false,
  })
  currentTokenId: string;

  @Column({
    default: null,
  })
  registerToken: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne((type) => Hrs, (entity) => entity.user)
  hrs: Hrs;

  @OneToOne((type) => Students, (entity) => entity.user)
  students: Students;

  @ManyToOne((type) => Role, (entity) => entity.user)
  role: Role;
}
