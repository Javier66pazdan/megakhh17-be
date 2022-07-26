import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Students} from "../students/students.entity";

@Entity()
export class StudentsHrs extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne(type => Students, entity => entity.studentsHrs)
    @JoinColumn()
    students: Students;
}

