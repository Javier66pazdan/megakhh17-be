import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class StudentsHr extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
