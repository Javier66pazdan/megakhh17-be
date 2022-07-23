import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Hrs} from "../hrs/hrs.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column({select: false})
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
}