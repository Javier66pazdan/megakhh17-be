import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
}