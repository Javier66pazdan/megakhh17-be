import {Inject, Injectable} from '@nestjs/common';
import {Students} from "./students.entity";
import {PaginatedAllStudentsResponse} from "../interfaces/students";
import {Student} from "../interfaces/students";
import {DataSource} from "typeorm";

@Injectable()
export class StudentsService {

    constructor(
        @Inject(DataSource) private datasource: DataSource,
    ) {
    }

    async getAllAvailableStudents(currentPage: number = 1): Promise<PaginatedAllStudentsResponse> {

        const itemsPerPage = 2;

        const totalItems = await this.datasource
            .createQueryBuilder(Students, 'students')
            .where('students.status = :studentsStatus', {studentsStatus: 3})
            .getCount()

        const allStudents = await this.datasource
            .createQueryBuilder(Students, 'students')
            .select(['students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'studentsProfile.firstName', 'studentsProfile.lastName', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp', 'studentsProfile.workExperience'])
            .where('students.status = :studentsStatus', {studentsStatus: 3})
            .leftJoin('students.studentsProfile', 'studentsProfile')
            .offset(itemsPerPage * (currentPage - 1))
            .limit(itemsPerPage)
            .execute()

        const totalPages = Math.ceil(totalItems / itemsPerPage);

        return {
            allStudents,
            totalItems,
            totalPages,
            itemsPerPage,
            currentPage,
        }
    }

    async getOneStudent(id: string): Promise<Students> {
        return await this.datasource
            .createQueryBuilder(Students, 'students')
            .where('students.id = :studentsId', {studentsId: id})
            .select(['students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'studentsProfile.firstName', 'studentsProfile.lastName', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp', 'studentsProfile.workExperience'])
            .leftJoin('students.studentsProfile', 'studentsProfile')
            .execute()
    }
}
