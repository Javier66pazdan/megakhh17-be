import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "../user/user.entity";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 6,
    })
    type: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    // @ManyToOne(type => User, entity => entity.role)
    // @JoinColumn()
    // user: User;
    @OneToMany(type => User, entity => entity.role)
    user: User;

}
