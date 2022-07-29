import {Inject, Injectable} from '@nestjs/common';
import {CreateStudentsHrDto} from './dto/create-students_hr.dto';
import {UpdateStudentsHrDto} from './dto/update-students_hr.dto';
import {StudentsHrsResponse} from "../interfaces/students_hrs";
import {StudentsHrs} from "./students_hrs.entity";
import {StudentsService} from "../students/students.service";
import {HrsService} from "../hrs/hrs.service";

@Injectable()
export class StudentsHrsService {

    constructor(
        @Inject(StudentsService) private studentsService: StudentsService,
        @Inject(HrsService) private hrsService: HrsService,
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

    findAll() {
        return `This action returns all studentsHrs`;
    }

    findOne(id: number) {
        return `This action returns a #${id} studentsHr`;
    }

    update(id: number, updateStudentsHrDto: UpdateStudentsHrDto) {
        return `This action updates a #${id} studentsHr`;
    }

    remove(id: number) {
        return `This action removes a #${id} studentsHr`;
    }
}