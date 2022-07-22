import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}