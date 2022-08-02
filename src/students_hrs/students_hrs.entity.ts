import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Students } from '../students/students.entity';
import { Hrs } from '../hrs/hrs.entity';
import { Student } from '../interfaces/students';

@Entity()
export class StudentsHrs extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne((type) => Students, (entity) => entity.studentsHrs)
  @JoinColumn()
  students: Student;

  @ManyToOne((type) => Hrs, (entity) => entity.studentsHrs)
  @JoinColumn()
  hrs: Hrs;
}
