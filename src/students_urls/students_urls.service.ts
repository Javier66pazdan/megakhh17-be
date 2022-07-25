import { Injectable } from '@nestjs/common';
import { CreateStudentsUrlDto } from './dto/create-students_url.dto';
import { UpdateStudentsUrlDto } from './dto/update-students_url.dto';

@Injectable()
export class StudentsUrlsService {
  create(createStudentsUrlDto: CreateStudentsUrlDto) {
    return 'This action adds a new studentsUrl';
  }

  findAll() {
    return `This action returns all studentsUrls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentsUrl`;
  }

  update(id: number, updateStudentsUrlDto: UpdateStudentsUrlDto) {
    return `This action updates a #${id} studentsUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentsUrl`;
  }
}
