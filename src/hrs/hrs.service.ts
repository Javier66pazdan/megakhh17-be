import {Inject, Injectable} from '@nestjs/common';
import {GetHrsResponse} from "../interfaces/hrs";
import {Hrs} from "./hrs.entity";
import {RegisterHrsDto} from "./dto/registerHrs.dto";
import {PaginatedHrAndStudentsResponse} from "../interfaces/students_hrs";
import {DataSource} from "typeorm";
import {StudentsHrs} from "../students_hrs/students_hrs.entity";

@Injectable()
export class HrsService {

    constructor(
        @Inject(DataSource) private dataSource: DataSource,
    ) {
    }

    async register(newHr: RegisterHrsDto): Promise<GetHrsResponse> {
        const hr = new Hrs();
        hr.fullName = newHr.fullName;
        hr.company = newHr.company;
        hr.maxReservedStudents = newHr.maxReservedStudents;

        await hr.save();
        return hr;
    }

    async getHrAndStudents(id: string, currentPage: number = 1): Promise<PaginatedHrAndStudentsResponse> {

        const itemsPerPage = 2;

        const totalItems = await this.dataSource
            .createQueryBuilder(StudentsHrs, 'studentsHrs')
            .where('studentsHrs.hrsId = :studentsHrsHrsId', {studentsHrsHrsId: id})
            .getCount()

        if (!totalItems) {
            return {
                success: false,
                message: `HR o podanym ID: ${id} nie istnieje!`
            }
        } else {
            const students = await this.dataSource
                .createQueryBuilder(StudentsHrs, 'studentsHrs')
                .select(['studentsHrs.createdAt', 'studentsProfile.firstName', 'studentsProfile.lastName', 'students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'expectedContractType.typeContract', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp'])
                .where('studentsHrs.hrsId = :studentsHrsHrsId', {studentsHrsHrsId: id})
                .leftJoin('studentsHrs.students', 'students')
                .leftJoin('students.studentsProfile', 'studentsProfile')
                .leftJoin('students.expectedContractType', 'expectedContractType')
                .offset(itemsPerPage * (currentPage - 1))
                .limit(itemsPerPage)
                .execute()

            const totalPages = Math.ceil(totalItems / itemsPerPage);

            return {
                students,
                totalItems,
                totalPages,
                itemsPerPage,
                currentPage,
            }
        }
    }

    async getOneHr(id: string): Promise<Hrs> {
        return await Hrs.findOne({where: {id}});
    }
}
