import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Students } from '../students/students.entity';

@Entity()
export class StudentsProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  email: string;

  @Column({
    length: 23,
    default: null,
  })
  tel: string;

  @Index({ fulltext: true })
  @Column({
    length: 57,
  })
  firstName: string;

  @Index({ fulltext: true })
  @Column({
    length: 255,
  })
  lastName: string;

  @Index({ fulltext: true })
  @Column({
    length: 255,
    default: null,
  })
  bio: string;

  @Column({
    length: 255,
  })
  githubUsername: string;

  @Column({
    length: 255,
  })
  githubPhotoUrl: string;

  @Column({
    length: 255,
  })
  portfolioUrls: string;

  @Column({
    length: 255,
  })
  projectUrls: string;

  @Index({ fulltext: true })
  @Column({
    length: 255,
    default: null,
  })
  targetWorkCity: string;
  //    Sugerowana nazwa: workTargetCity

  @Column({
    default: 0,
  })
  expectedSalary: number;
  //W dokumentacji jest literówka: exprctedSalary

  @Column({
    default: 0,
  })
  canTakeApprenticeship: number;

  @Column({
    default: 0,
  })
  monthsOfCommercialExp: number;

  @Index({ fulltext: true })
  @Column({
    default: null,
  })
  education: string;

  @Index({ fulltext: true })
  @Column({
    default: null,
  })
  workExperience: string;

  @Index({ fulltext: true })
  @Column({
    default: null,
  })
  courses: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @OneToOne((type) => Students, (entity) => entity.studentsProfile)
  students: Students;
}
