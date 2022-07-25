import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Hrs} from "../hrs/hrs.entity";
import {Students} from "../students/students.entity";
import {Role} from "../role/role.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column() // password
    pwdHash: string;

    @Column({
        default: null,
        nullable: true,
        select: false,
    })
    currentTokenId: string;

    @Column({
        length: 50,
        nullable: false,
        select: false,
    })
    registerToken: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ManyToOne(type => Hrs, entity => entity.user)
    @JoinColumn()
    hrs: Hrs;

    @ManyToOne(type => Students, entity => entity.user)
    @JoinColumn()
    students: Students;

    @OneToMany(type => Role, entity => entity.user)
    role: Role[];
}
