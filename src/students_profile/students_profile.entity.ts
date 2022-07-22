import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

export class StudentsProfile extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    email: string;

    @Column({
        length: 23,
        default: null,
    })
    tel: string;

    @Column({
        length: 57,
    })
    firstName: string;

    @Column({
        length: 255,
    })
    lastName: string;

    @Column({
        length: 255,
        default: null,
    })
    bio: string;

    @Column({
        length: 255,
    })
    githubUsername: string;

    @Column({
        length: 255,
        default: null,
    })
    targetWorkCity: string;
//    Suggested name: workTargetCity

    @Column({
        default: 0,
    })
    expectedSalary: number;

    @Column({
        default: 0,
    })
    canTakeApprenticeship: number;

    @Column({
        default: 0,
    })
    monthsOfCommercialExp: number;

    @Column({
        default: null,
    })
    education: string;

    @Column({
        default: null,
    })
    workExperience: string;

    @Column({
        default: null,
    })
    courses: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}
