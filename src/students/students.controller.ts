import {Controller, Get, Inject, Param} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {AllStudentsResponse, Student} from "../interfaces/students";

@Controller('students')
export class StudentsController {

    constructor(
        @Inject(StudentsService) private studentsService: StudentsService,
    ) {
    }

    @Get('/')
    allAvailableStudents(): Promise<AllStudentsResponse> {
        return this.studentsService.getAllAvailableStudents();
    }

    @Get('/:id')
    oneStudent(
        @Param('id') id: string
    ): Promise<Student> {
        return this.studentsService.getOneStudent(id);
    }
}
