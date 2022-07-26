import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Students } from "../students/students.entity";

@Entity()
export class ExpectedTypeWork extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25
  })
  typeWork: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(type => Students, entity => entity.expectedTypeWork)
  students: Students;
}