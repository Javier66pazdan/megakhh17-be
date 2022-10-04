import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { StudentsProfileService } from './students_profile.service';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';

@Controller('students-profile')
export class StudentsProfileController {
  constructor(
    private readonly studentsProfileService: StudentsProfileService,
  ) {}

  @Post()
  create(@Body() createStudentsProfileDto: CreateStudentsProfileDto) {
    return this.studentsProfileService.create(createStudentsProfileDto);
  }
}
