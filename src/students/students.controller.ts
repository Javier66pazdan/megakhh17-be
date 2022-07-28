import {Controller, Get, Inject, Param} from '@nestjs/common';
import {StudentsService} from "./students.service";
import {AllStudentsResponse, PaginatedAllStudentsResponse, Student} from "../interfaces/students";
import {Paginate, Paginated, PaginateQuery} from "nestjs-paginate";

@Controller('students')
export class StudentsController {

    constructor(
        @Inject(StudentsService) private studentsService: StudentsService,
    ) {
    }

    @Get('/:pageNo')
    allAvailableStudents(
        @Param('pageNo') pageNo: number,
    ): Promise<PaginatedAllStudentsResponse> {
        return this.studentsService.getAllAvailableStudents(pageNo);
    }

    @Get('/:id')
    oneStudent(
        @Param('id') id: string
    ): Promise<Student> {
        return this.studentsService.getOneStudent(id);
    }
}
