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

    async getAllAvailableStudents(currentPage: number = 1, status: number = 3): Promise<PaginatedAllStudentsResponse> {
        const itemsPerPage = 2;
        const [students, count] = await Students.findAndCount({
            where: {status},
            relations: ['studentsProfile'],
            skip: itemsPerPage * (currentPage - 1),
            take: itemsPerPage,
        });

        const totalPages = Math.ceil(count / itemsPerPage);

        return {
            students,
            totalPages,
            itemsPerPage,
        }
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
