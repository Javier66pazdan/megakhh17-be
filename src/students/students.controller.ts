import {Controller, Get, Inject, Param} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {AllStudentsResponse, Student} from "../interfaces/students";
import {Students} from "./students.entity";

@Controller('students')
export class StudentsController {

    constructor(
        @Inject(StudentsService) private studentsService: StudentsService,
    ) {
    }

    @Get('/')
    allStudents(): Promise<AllStudentsResponse> {
        return this.studentsService.getAllStudents();
    }

    @Get('/:id')
    oneStudent(
        @Param('id') id: string
    ): Promise<Students> {
        return this.studentsService.getOneStudent(id);
    }
}
