import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Students extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 36,
        default: null,
    })
    user_id: string;

    @Column({
        default: 0,
        length: 1,
    })
    courseCompletion: number;
    //Sugerowana nazwa: 'courseFinalGrade'

    @Column({
        default: 0,
        length: 1,
    })
    courseEngagement: number;

    @Column({
        default: 0,
        length: 1,
    })
    projectDegree: number;
    //Sugerowana nazwa: 'projectGrade'

    @Column({
        default: 0,
        length: 1,
    })
    teamProjectDegree: number;
    //Sugerowana nazwa: 'teamProjectGrade'

    @Column({
        default: null,
    })
    students_profile_id: string;

    @Column({
        default: 0,
        length: 1,
    })
    status: number;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
}