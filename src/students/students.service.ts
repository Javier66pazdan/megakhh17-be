import {Inject, Injectable} from '@nestjs/common';
import {Students} from "./students.entity";
import {AllStudentsResponse} from "../interfaces/students";
import {Student} from "../interfaces/students";
import {DataSource} from "typeorm";

@Injectable()
export class StudentsService {

    constructor(
        @Inject(DataSource) private datasource: DataSource,
    ) {
    }

    async getAllAvailableStudents(): Promise<AllStudentsResponse> {
        return await this.datasource
            .createQueryBuilder(Students, 'students')
            .where('students.status = :studentsStatus', {studentsStatus: 1})
            .select(['students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'studentsProfile.firstName', 'studentsProfile.lastName', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp', 'studentsProfile.workExperience'])
            .leftJoin('students.studentsProfile', 'studentsProfile')
            .execute()
    }

    async getOneStudent(id: string): Promise<Student> {
        return await this.datasource
            .createQueryBuilder(Students, 'students')
            .where('students.id = :studentsId', {studentsId: id})
            .select(['students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'studentsProfile.firstName', 'studentsProfile.lastName', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp', 'studentsProfile.workExperience'])
            .leftJoin('students.studentsProfile', 'studentsProfile')
            .execute()
    }
}
