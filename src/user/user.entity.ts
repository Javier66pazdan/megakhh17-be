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
        nullable: true,
        default: null,
        select: false,
    })
    currentTokenId: string | null;
}
