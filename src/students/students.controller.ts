import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
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
    @Param('pageNo') pageNo: number,
    @Param('itemsPerPage') itemsPerPage: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(
      Number(pageNo),
      Number(itemsPerPage),
    );
  }

  @Get(
    '/filter/:pageNo/:itemsPerPage/:searchText/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWorkId/:expectedContractTypeId/:expectedSalaryMin/:expectedSalaryMax/:canTakeApprenticeship/:monthsOfCommercialExp',
  )
  filteredStudents(
    @Param('pageNo') pageNo: number,
    @Param('itemsPerPage') itemsPerPage: number,
    @Param('searchText') searchText?: string,
    @Param('courseCompletion') courseCompletion?: number,
    @Param('courseEngagement') courseEngagement?: number,
    @Param('projectDegree') projectDegree?: number,
    @Param('teamProjectDegree') teamProjectDegree?: number,
    @Param('expectedTypeWorkId') expectedTypeWorkId?: string,
    @Param('expectedContractTypeId') expectedContractTypeId?: string,
    @Param('expectedSalaryMin') expectedSalaryMin?: number,
    @Param('expectedSalaryMax') expectedSalaryMax?: number,
    @Param('canTakeApprenticeship') canTakeApprenticeship?: Apprenticeship,
    @Param('monthsOfCommercialExp') monthsOfCommercialExp?: number,
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
    @Param('status') status: Status,
  ): Promise<GetUpdateStatusResponse> {
    return this.studentsService.updateStatus(id, status);
  }
}
