import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { StudentsHrs } from '../students_hrs/students_hrs.entity';

@Entity()
export class Hrs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  fullName: string;

  @Column({
    length: 255,
  })
  company: string;

  @Column({
    default: 0,
  })
  maxReservedStudents: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne((type) => User, (entity) => entity.hrs)
  @JoinColumn()
  user: User;

  @OneToMany((type) => StudentsHrs, (entity) => entity.hrs)
  studentsHrs: StudentsHrs[];
}
