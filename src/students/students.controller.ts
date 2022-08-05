import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  GetOneStudentResponse,
  PaginatedAllStudentsResponse,
} from '../interfaces/students';
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { RegisterHrsDto } from '../hrs/dto/registerHrs.dto';
import { GetHrsResponse } from '../interfaces/hrs';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
  ) {}

  @Get('/:id')
  oneStudent(@Param('id') id: string): Promise<GetOneStudentResponse> {
    return this.studentsService.getOneStudent(id);
  }

  @Get('/all/:pageNo')
  allAvailableStudents(
    @Param('pageNo') pageNo: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(pageNo);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateStudentsProfileDto: UpdateStudentProfileDto,
  // ): Promise<StudentsProfileUpdateResponse> {
  //   return this.studentsService.update(id, updateStudentsProfileDto);
  // }

  @Patch('/student-profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    return this.studentsService.update(id, updateStudentProfile);
  }
}
