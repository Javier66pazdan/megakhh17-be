import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.studentsProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsProfileService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsProfileService.remove(+id);
  }
}
