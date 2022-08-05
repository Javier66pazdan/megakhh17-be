import { Inject, Injectable } from '@nestjs/common';
import { Students } from './students.entity';
import {
  GetOneStudentResponse,
  PaginatedAllStudentsResponse,
} from '../interfaces/students';
import { DataSource } from 'typeorm';
import { StudentsDto } from './dto/students.dto';
import { User } from '../user/user.entity';
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { StudentsProfile } from '../students_profile/students_profile.entity';

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

  async getOneStudent(id: string): Promise<GetOneStudentResponse> {
    const findStudent = await Students.findOne({ where: { id } });

    if (!findStudent) {
      return {
        success: false,
        message: `Student o podanym ID: ${id} nie istnieje`,
      };
    } else {
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

  async update(
    id: string,
    updateStudentProfile: UpdateStudentProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    const findStudent = await Students.findOne({
      relations: {
        expectedContractType: true,
      },
      where: {
        id,
      },
    });
    console.log(findStudent);
    if (!findStudent) {
      return {
        success: false,
        message: `Student o podanym ID: ${id} nie istnieje!`,
      };
    }
    const findProfile = await Students.findOne({
      relations: {
        studentsProfile: true,
        expectedContractType: true,
      },
      where: {
        id,
      },
    });

    if (findProfile.studentsProfile === null) {
      const studentNewProfile = new StudentsProfile();
      const {
        email,
        tel,
        bonusProjectUrls,
        bio,
        githubUsername,
        portfolioUrls,
        projectUrls,
        targetWorkCity,
        expectedSalary,
        canTakeApprenticeship,
        monthsOfCommercialExp,
        education,
        workExperience,
        courses,
        expectedContractType,
      } = updateStudentProfile;

      findStudent.bonusProjectUrls = bonusProjectUrls;
      // findStudent.expectedContractType[] = expectedContractType[1];

      studentNewProfile.email = email;
      studentNewProfile.tel = tel;
      studentNewProfile.bio = bio;
      studentNewProfile.githubUsername = githubUsername;
      studentNewProfile.portfolioUrls = portfolioUrls;
      studentNewProfile.projectUrls = projectUrls;
      studentNewProfile.targetWorkCity = targetWorkCity;
      studentNewProfile.canTakeApprenticeship = canTakeApprenticeship;
      studentNewProfile.monthsOfCommercialExp = monthsOfCommercialExp;
      studentNewProfile.education = education;
      studentNewProfile.workExperience = workExperience;
      studentNewProfile.expectedSalary = expectedSalary;
      studentNewProfile.courses = courses;

      findStudent.studentsProfile = studentNewProfile;

      await Students.save(findStudent);

      return {
        success: true,
        message: `Profil studenta o ID: ${id} został utworzony.`,
      };
    } else {
      const {
        email,
        tel,
        bonusProjectUrls,
        bio,
        githubUsername,
        portfolioUrls,
        projectUrls,
        targetWorkCity,
        expectedSalary,
        canTakeApprenticeship,
        monthsOfCommercialExp,
        education,
        workExperience,
        courses,
        expectedContractType,
      } = updateStudentProfile;

      findStudent.bonusProjectUrls = bonusProjectUrls;

      findProfile.studentsProfile.email = email;
      findProfile.studentsProfile.tel = tel;
      findProfile.studentsProfile.bio = bio;
      findProfile.studentsProfile.githubUsername = githubUsername;
      findProfile.studentsProfile.portfolioUrls = portfolioUrls;
      findProfile.studentsProfile.projectUrls = projectUrls;
      findProfile.studentsProfile.targetWorkCity = targetWorkCity;
      findProfile.studentsProfile.canTakeApprenticeship = canTakeApprenticeship;
      findProfile.studentsProfile.monthsOfCommercialExp = monthsOfCommercialExp;
      findProfile.studentsProfile.education = education;
      findProfile.studentsProfile.workExperience = workExperience;
      findProfile.studentsProfile.expectedSalary = expectedSalary;
      findProfile.studentsProfile.courses = courses;

      await Students.save(findProfile);
      await Students.save(findStudent);

      return {
        success: true,
        message: `Profil studenta o ID: ${id} został zaktualizowany.`,
      };
    }
  }
}
