import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsHrsService } from './students_hrs.service';
import { CreateStudentsHrDto } from './dto/create-students_hr.dto';
import { UpdateStudentsHrDto } from './dto/update-students_hr.dto';
import {StudentsHrsResponse} from "../interfaces/students_hrs";

@Controller('students-hrs')
export class StudentsHrsController {
  constructor(private readonly studentsHrsService: StudentsHrsService) {}

  @Post()
  create(@Body() createStudentsHrDto: CreateStudentsHrDto): Promise<StudentsHrsResponse> {
    return this.studentsHrsService.create(createStudentsHrDto);
  }

  @Get()
  findAll() {
    return this.studentsHrsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsHrsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentsHrDto: UpdateStudentsHrDto) {
    return this.studentsHrsService.update(+id, updateStudentsHrDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsHrsService.remove(+id);
  }
}
