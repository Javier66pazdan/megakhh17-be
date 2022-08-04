import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsProfileService } from './students_profile.service';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';

@Controller('students-profile')
export class StudentsProfileController {
  constructor(
    private readonly studentsProfileService: StudentsProfileService,
  ) {}

  @Post()
  create(@Body() createStudentsProfileDto: CreateStudentsProfileDto) {
    return this.studentsProfileService.create(createStudentsProfileDto);
  }

  @Get()
  findAll() {
    return this.studentsProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsProfileService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentsProfileDto: UpdateStudentsProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    return this.studentsProfileService.update(id, updateStudentsProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsProfileService.remove(+id);
  }
}
