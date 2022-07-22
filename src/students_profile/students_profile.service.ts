import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';

@Injectable()
export class StudentsProfileService {
  create(createStudentsProfileDto: CreateStudentsProfileDto) {
    return 'This action adds a new studentsProfile';
  }

  findAll() {
    return `This action returns all studentsProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentsProfile`;
  }

  update(id: number, updateStudentsProfileDto: UpdateStudentsProfileDto) {
    return `This action updates a #${id} studentsProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentsProfile`;
  }
}
