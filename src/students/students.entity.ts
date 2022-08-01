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
import {StudentsHrs} from "../students_hrs/students_hrs.entity";
import {StudentsProfile} from "../students_profile/students_profile.entity";
import { ExpectedTypeWork } from "../expected_type_work/expected_type_work.entity";
import { ExpectedContractType } from "../expected_contract_type/expected_contract_type.entity";

@Entity()
export class Students extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: 0,
    })
    courseCompletion: number;
    //Sugerowana nazwa: 'courseFinalGrade'

    @Column({
        default: 0,
    })
    courseEngagement: number;

    @Column({
        default: 0,
    })
    projectDegree: number;
    //Sugerowana nazwa: 'projectGrade'

    @Column({
        default: 0,
    })
    teamProjectDegree: number;
    //Sugerowana nazwa: 'teamProjectGrade'

    @Column()
    bonusProjectUrls: string;

    @Column({
        default: 0,
    })
    status: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToOne(type => User, entity => entity.students)
    @JoinColumn()
    user: User;

    @OneToOne(type => StudentsHrs, entity => entity.students)
    studentsHrs: StudentsHrs;

    @OneToOne(type => StudentsProfile, entity => entity.students)
    studentsProfile: StudentsProfile;

    @ManyToOne(type => ExpectedTypeWork, entity => entity.id)
    expectedTypeWork: ExpectedTypeWork[];

    @ManyToOne(type => ExpectedContractType, entity => entity.id)
    expectedContractType: ExpectedContractType[];
}
