import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Hrs extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: null,
    })
    user_id: string;

    @Column({
        length: 255,
    })
    fullName: string;

    @Column({
        length: 255,
    })
    company: string;

    @Column({
        length: 3,
        default: 0,
    })
    maxReservedStudents: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}