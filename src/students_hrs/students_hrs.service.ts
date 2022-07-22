import { Injectable } from '@nestjs/common';
import { CreateStudentsHrDto } from './dto/create-students_hr.dto';
import { UpdateStudentsHrDto } from './dto/update-students_hr.dto';

@Injectable()
export class StudentsHrsService {
  create(createStudentsHrDto: CreateStudentsHrDto) {
    return 'This action adds a new studentsHr';
  }

  findAll() {
    return `This action returns all studentsHrs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentsHr`;
  }

  update(id: number, updateStudentsHrDto: UpdateStudentsHrDto) {
    return `This action updates a #${id} studentsHr`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentsHr`;
  }
}
