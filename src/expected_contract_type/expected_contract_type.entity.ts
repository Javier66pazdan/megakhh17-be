import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Students } from "../students/students.entity";

@Entity()
export class ExpectedContractType extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 25
    })
    typeContract: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToMany(type => Students, entity => entity.expectedContractType)
    students: Students;
}
