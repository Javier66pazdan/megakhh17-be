import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsUrlsService } from './students_urls.service';
import { CreateStudentsUrlDto } from './dto/create-students_url.dto';
import { UpdateStudentsUrlDto } from './dto/update-students_url.dto';

@Controller('students-urls')
export class StudentsUrlsController {
  constructor(private readonly studentsUrlsService: StudentsUrlsService) {}

  @Post()
  create(@Body() createStudentsUrlDto: CreateStudentsUrlDto) {
    return this.studentsUrlsService.create(createStudentsUrlDto);
  }

  @Get()
  findAll() {
    return this.studentsUrlsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsUrlsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentsUrlDto: UpdateStudentsUrlDto) {
    return this.studentsUrlsService.update(+id, updateStudentsUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsUrlsService.remove(+id);
  }
}
