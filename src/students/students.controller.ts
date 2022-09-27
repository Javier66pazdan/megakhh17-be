import { Body, Controller, Get, Inject, Param, ParseIntPipe, Patch, Query } from "@nestjs/common";
import { StudentsService } from "./students.service";
import {
  Apprenticeship,
  GetUpdateStatusResponse,
  PaginatedAllStudentsResponse,
  PaginatedFilteredStudentsResponse,
  Status,
  Student
} from "../interfaces/students";
import { UpdateStudentProfileDto } from "../students_profile/dto/updateStudentProfileDto";
import { StudentsProfileUpdateResponse } from "../interfaces/students_profile";
import { FilteredStudentsDto } from "./dto/filtered-students.dto";

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

  @Get('/all/:hrId/:pageNo/:itemsPerPage')
  allAvailableStudents(
    @Param('hrId') hrId: string,
    @Param('pageNo', ParseIntPipe)
    pageNo: number,
    @Param('itemsPerPage', ParseIntPipe)
    itemsPerPage: number,
  ): Promise<PaginatedAllStudentsResponse> {
    return this.studentsService.getAllAvailableStudents(
      hrId,
      pageNo,
      itemsPerPage,
    );
  }

  @Get('/filter/search')
  filteredStudents(
    @Query()
    {
      pageNo,
      itemsPerPage,
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
    }: FilteredStudentsDto,
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
