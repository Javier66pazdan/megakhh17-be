import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsHrsService } from './students_hrs.service';
import { CreateStudentsHrDto } from './dto/create-students_hr.dto';
import { UpdateStudentsHrDto } from './dto/update-students_hr.dto';
import {
  HrRemoveStudentResponse,
  PaginatedHrAndStudentsResponse,
  StudentsHrsResponse,
} from '../interfaces/students_hrs';

@Controller('students-hrs')
export class StudentsHrsController {
  constructor(private readonly studentsHrsService: StudentsHrsService) {}

  @Post()
  create(
    @Body() createStudentsHrDto: CreateStudentsHrDto,
  ): Promise<StudentsHrsResponse> {
    return this.studentsHrsService.create(createStudentsHrDto);
  }

  @Get('/students/:id/:pageNo/:itemsPerPage')
  hrStudents(
    @Param('id') id: string,
    @Param('pageNo') pageNo: number,
    @Param('itemsPerPage') itemsPerPage: number,
  ): Promise<PaginatedHrAndStudentsResponse> {
    return this.studentsHrsService.getHrStudents(id, pageNo, itemsPerPage);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentsHrDto: UpdateStudentsHrDto,
  ) {
    return this.studentsHrsService.update(+id, updateStudentsHrDto);
  }

  @Delete('/:studentId/:hrId')
  remove(
    @Param('studentId') studentId: string,
    @Param('hrId') hrId: string,
  ): Promise<HrRemoveStudentResponse> {
    return this.studentsHrsService.removeHrStudent(studentId, hrId);
  }
}
