import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  GetOneStudentResponse,
  GetOneStudentResponseWithErrors,
  GetUpdateStatusResponse,
  PaginatedAllStudentsResponse,
  PaginatedFilteredStudentsResponse,
  Student,
} from '../interfaces/students';
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { Status } from '../interfaces/students';
import { Apprenticeship } from '../interfaces/students';
import { NotFoundException } from '../errors/not-found.exception';
import { GetAllAvailableStudentsQuery } from './param-validation/students.param-validation';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
  ) {}

  @Get('/:id')
  oneStudent(@Param('id') id: string): Promise<Student> {
    return this.studentsService.getOneStudent(id);
  }

  @Get('/profile/:id')
  oneStudentAndProfile(@Param('id') id: string): Promise<Student> {
    return this.studentsService.getOneStudentAndProfile(id);
  }

  @Get('/all/:pageNo/:itemsPerPage')
  allAvailableStudents(
    @Param('pageNo', ParseIntPipe)
    pageNo: number,
    @Param('itemsPerPage', ParseIntPipe)
    itemsPerPage: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(pageNo, itemsPerPage);
  }

  @Get(
    '/filter/:pageNo/:itemsPerPage/:searchText/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWorkId/:expectedContractTypeId/:expectedSalaryMin/:expectedSalaryMax/:canTakeApprenticeship/:monthsOfCommercialExp',
  )
  filteredStudents(
    @Param('pageNo', ParseIntPipe) pageNo: number,
    @Param('itemsPerPage', ParseIntPipe) itemsPerPage: number,
    @Param('searchText') searchText?: string,
    @Param('courseCompletion', ParseIntPipe) courseCompletion?: number,
    @Param('courseEngagement', ParseIntPipe) courseEngagement?: number,
    @Param('projectDegree', ParseIntPipe) projectDegree?: number,
    @Param('teamProjectDegree', ParseIntPipe) teamProjectDegree?: number,
    @Param('expectedTypeWorkId', ParseIntPipe) expectedTypeWorkId?: string,
    @Param('expectedContractTypeId', ParseIntPipe)
    expectedContractTypeId?: string,
    @Param('expectedSalaryMin', ParseIntPipe) expectedSalaryMin?: number,
    @Param('expectedSalaryMax', ParseIntPipe) expectedSalaryMax?: number,
    @Param('canTakeApprenticeship')
    canTakeApprenticeship?: Apprenticeship,
    @Param('monthsOfCommercialExp', ParseIntPipe)
    monthsOfCommercialExp?: number,
  ): Promise<PaginatedFilteredStudentsResponse> {
    return this.studentsService.getFilteredStudents(
      Number(pageNo),
      Number(itemsPerPage),
      searchText,
      courseCompletion,
      courseEngagement,
      projectDegree,
      teamProjectDegree,
      expectedTypeWorkId,
      expectedContractTypeId,
      expectedSalaryMin,
      expectedSalaryMax,
      canTakeApprenticeship,
      monthsOfCommercialExp,
    );
  }

  @Patch('/student-profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    return this.studentsService.update(id, updateStudentProfile);
  }

  @Patch('/status/:id/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status', ParseIntPipe) status: Status,
  ): Promise<GetUpdateStatusResponse> {
    return this.studentsService.updateStatus(id, status);
  }
}
