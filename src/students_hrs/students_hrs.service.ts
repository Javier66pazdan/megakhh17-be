import {Inject, Injectable} from '@nestjs/common';
import {CreateStudentsHrDto} from './dto/create-students_hr.dto';
import {UpdateStudentsHrDto} from './dto/update-students_hr.dto';
import {PaginatedHrAndStudentsResponse, StudentsHrsResponse} from "../interfaces/students_hrs";
import {StudentsHrs} from "./students_hrs.entity";
import {StudentsService} from "../students/students.service";
import {HrsService} from "../hrs/hrs.service";
import {DataSource} from "typeorm";
import {StudentsProfile} from "../students_profile/students_profile.entity";


@Injectable()
export class StudentsHrsService {

    constructor(
        @Inject(StudentsService) private studentsService: StudentsService,
        @Inject(HrsService) private hrsService: HrsService,
        @Inject(DataSource) private dataSource: DataSource,
    ) {
    }

    async create(createStudentsHrDto: CreateStudentsHrDto): Promise<StudentsHrsResponse> {

        try {
            const {hrId, studentId} = createStudentsHrDto;

            const hr = await this.hrsService.getOneHr(hrId);
            const student = await this.studentsService.getOneStudent(studentId);

            if (!hr) {
                return {
                    success: false,
                    message: `HR o podanym ID: ${hrId} nie istnieje!`
                }
            } else if (!student) {
                return {
                    success: false,
                    message: `Student o podanym ID: ${studentId} nie istnieje!`
                }
            } else {
                const studentHr = new StudentsHrs();
                await studentHr.save();

                studentHr.hrs = hr;
                studentHr.students = student;

                await studentHr.save();

                return {
                    success: true,
                    message: `Student o ID: ${studentId} został pomyślnie przypisany do HR o ID: ${hrId}`,
                }
            }
        } catch (e) {
            return {
                success: false,
                message: `Student o podanym ID jest już przypisany do HR o podanym ID`,
            }
        }
    };

    async getHrStudents(id: string, currentPage: number = 1): Promise<PaginatedHrAndStudentsResponse> {

        const itemsPerPage = 2;

        const totalItems = await this.dataSource
            .createQueryBuilder(StudentsHrs, 'studentsHrs')
            .where('studentsHrs.hrsId = :studentsHrsHrsId', {studentsHrsHrsId: id})
            .getCount()

        if (!totalItems) {
            return {
                success: false,
                message: `HR o podanym ID: ${id} nie ma przypisanych studentów lub nie istnieje!`
            }
        } else {

            const students = await this.dataSource
                .createQueryBuilder(StudentsHrs, 'studentsHrs')
                .select(['studentsHrs.createdAt', 'studentsProfile.firstName', 'studentsProfile.lastName', 'students.courseCompletion', 'students.courseEngagement', 'students.projectDegree', 'students.teamProjectDegree', 'expectedContractType.typeContract', 'studentsProfile.targetWorkCity', 'studentsProfile.expectedSalary', 'studentsProfile.canTakeApprenticeship', 'studentsProfile.monthsOfCommercialExp', 'studentsProfile.githubUsername', 'studentsProfile.githubPhotoUrl'])
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
                currentPage
            }
        }
    }

    findOne(id: string) {
    }

    update(id: number, updateStudentsHrDto: UpdateStudentsHrDto) {
        return `This action updates a #${id} studentsHr`;
    }

    remove(id: number) {
        return `This action removes a #${id} studentsHr`;
    }
}