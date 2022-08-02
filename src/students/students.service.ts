import { Inject, Injectable } from '@nestjs/common';
import { Students } from './students.entity';
import { PaginatedAllStudentsResponse } from '../interfaces/students';
import { Student } from '../interfaces/students';
import { DataSource } from 'typeorm';
import { StudentsDto } from './dto/students.dto';
import { User } from '../user/user.entity';

@Injectable()
export class StudentsService {
  constructor(@Inject(DataSource) private datasource: DataSource) {}

  async getAllAvailableStudents(
    currentPage = 1,
  ): Promise<PaginatedAllStudentsResponse> {
    const itemsPerPage = 2;

    const totalItems = await this.datasource
      .createQueryBuilder(Students, 'students')
      .where('students.status = :studentsStatus', { studentsStatus: 3 })
      .getCount();

    const allStudents = await this.datasource
      .createQueryBuilder(Students, 'students')
      .select([
        'students.courseCompletion',
        'students.courseEngagement',
        'students.projectDegree',
        'students.teamProjectDegree',
        'studentsProfile.firstName',
        'studentsProfile.lastName',
        'studentsProfile.targetWorkCity',
        'studentsProfile.expectedSalary',
        'studentsProfile.canTakeApprenticeship',
        'studentsProfile.monthsOfCommercialExp',
        'studentsProfile.workExperience',
      ])
      .where('students.status = :studentsStatus', { studentsStatus: 3 })
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .offset(itemsPerPage * (currentPage - 1))
      .limit(itemsPerPage)
      .execute();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      allStudents,
      totalItems,
      totalPages,
      itemsPerPage,
      currentPage,
    };
  }

  async getOneStudent(id: string): Promise<Student> {
    return await this.datasource
      .createQueryBuilder(Students, 'students')
      .where('students.id = :studentsId', { studentsId: id })
      .select([
        'students.courseCompletion',
        'students.courseEngagement',
        'students.projectDegree',
        'students.teamProjectDegree',
        'studentsProfile.firstName',
        'studentsProfile.lastName',
        'studentsProfile.targetWorkCity',
        'studentsProfile.expectedSalary',
        'studentsProfile.canTakeApprenticeship',
        'studentsProfile.monthsOfCommercialExp',
        'studentsProfile.workExperience',
      ])
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .execute();
  }

  async addStudent(newStudent: StudentsDto) {
    const student = new Students();

    const findUser = await User.findOne({ where: { id: newStudent.userId } });

    if (!findUser) {
      return {
        message: 'Nie znaleziono studenta z takim id.',
      };
    }

    student.courseCompletion = newStudent.courseCompletion;
    student.courseEngagement = newStudent.courseEngagement;
    student.projectDegree = newStudent.projectDegree;
    student.teamProjectDegree = newStudent.teamProjectDegree;
    student.bonusProjectUrls = newStudent.bonusProjectUrls;
    student.user = findUser;

    await student.save();

    return student;
  }
}
