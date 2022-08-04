import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  AllStudentsResponse,
  GetOneStudentResponse,
  PaginatedAllStudentsResponse,
  Student,
} from '../interfaces/students';
import { StudentsDto } from './dto/students.dto';
import { Students } from './students.entity';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
  ) {}

  // @Get('/')
  // allStudents(): Promise<AllStudentsResponse> {
  //   return this.studentsService.getAllStudents();
  // }

  @Get('/:id')
  oneStudent(@Param('id') id: string): Promise<GetOneStudentResponse> {
    return this.studentsService.getOneStudent(id);
  }

  // @Post('/')
  // addOneStudent(@Body() newStudent: StudentsDto): Promise<any> {
  //   return this.studentsService.addStudent(newStudent);
  // }

  @Get('/all/:pageNo')
  allAvailableStudents(
    @Param('pageNo') pageNo: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(pageNo);
  }
}
