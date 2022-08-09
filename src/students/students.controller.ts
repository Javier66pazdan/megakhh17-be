import { Body, Controller, Get, Inject, Param, Patch } from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  GetOneStudentResponse,
  PaginatedAllStudentsResponse, PaginatedFilteredStudentsResponse,
  Student
} from "../interfaces/students";
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';

@Controller('students')
export class StudentsController {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
  ) {}

  @Get('/:id')
  oneStudent(@Param('id') id: string): Promise<GetOneStudentResponse> {
    return this.studentsService.getOneStudent(id);
  }

  @Get('/all/:pageNo/:itemsPerPage')
  allAvailableStudents(
    @Param('pageNo') pageNo: number,
    @Param('itemsPerPage') itemsPerPage: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(pageNo, itemsPerPage);
  }

  @Get(
    '/filter/:pageNo/:itemsPerPage/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractTypeId/:expectedSalaryMin/:expectedSalaryMax/:canTakeApprenticeship/:monthsOfCommercialExp/:searchText',
  )
  filteredStudents(
    @Param('pageNo') pageNo: number,
    @Param('itemsPerPage') itemsPerPage: number,
    @Param('courseCompletion') courseCompletion?: number,
    @Param('courseEngagement') courseEngagement?: number,
    @Param('projectDegree') projectDegree?: number,
    @Param('teamProjectDegree') teamProjectDegree?: number,
    @Param('expectedTypeWorkId') expectedTypeWorkId?: string,
    @Param('expectedContractTypeId') expectedContractTypeId?: string,
    @Param('expectedSalaryMin') expectedSalaryMin?: number,
    @Param('expectedSalaryMax') expectedSalaryMax?: number,
    @Param('canTakeApprenticeship') canTakeApprenticeship?: number,
    @Param('monthsOfCommercialExp') monthsOfCommercialExp?: number,
    @Param('searchText') searchText?: string,
  ): Promise<PaginatedFilteredStudentsResponse> {
    return this.studentsService.getFilteredStudents(
      pageNo,
      itemsPerPage,
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
      searchText,
    );
  }

  @Patch('/student-profile/:id')
  update(
    @Param('id') id: string,
    @Body() updateStudentProfile: UpdateStudentProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    return this.studentsService.update(id, updateStudentProfile);
  }
}
