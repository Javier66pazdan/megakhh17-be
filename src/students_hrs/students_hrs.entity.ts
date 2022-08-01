import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Students} from "../students/students.entity";

@Entity()
export class StudentsHrs extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToOne(type => Students, entity => entity.studentsHrs)
    @JoinColumn()
    students: Students;
}

