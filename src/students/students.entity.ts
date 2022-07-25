import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {StudentsHrs} from "../students_hrs/students_hrs.entity";
import {StudentsProfile} from "../students_profile/students_profile.entity";

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

    @Column({
        default: 0,
    })
    status: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @OneToMany(type => User, entity => entity.students)
    user: User[];

    @ManyToOne(type => StudentsHrs, entity => entity.students)
    @JoinColumn()
    studentsHrs: StudentsHrs;

    @OneToMany(type => StudentsProfile, entity => entity.students)
    studentsProfile: StudentsProfile[];
}