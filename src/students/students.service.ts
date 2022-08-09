import { Inject, Injectable } from '@nestjs/common';
import { Students } from './students.entity';
import {
  GetOneStudentResponse,
  PaginatedAllStudentsResponse,
  PaginatedFilteredStudentsResponse,
} from '../interfaces/students';
import { DataSource } from 'typeorm';
import { StudentsDto } from './dto/students.dto';
import { User } from '../user/user.entity';
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { StudentsProfile } from '../students_profile/students_profile.entity';
import { ExpectedContractType } from '../expected_contract_type/expected_contract_type.entity';
import { ExpectedTypeWork } from '../expected_type_work/expected_type_work.entity';

@Injectable()
export class StudentsService {
  constructor(@Inject(DataSource) private datasource: DataSource) {}

  async getAllAvailableStudents(
    currentPage = 1,
    itemsPerPage,
  ): Promise<PaginatedAllStudentsResponse> {
    const totalItems = await this.datasource
      .createQueryBuilder(Students, 'students')
      .where('students.status = :studentsStatus', { studentsStatus: 3 })
      .getCount();

    const allStudents = await this.datasource
      .createQueryBuilder(Students, 'students')
      .select([
        'students.id',
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
        'expectedContractType.typeContract',
      ])
      .where('students.status = :studentsStatus', { studentsStatus: 3 })
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .leftJoin('students.expectedContractType', 'expectedContractType')
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

  async getFilteredStudents(
    currentPage = 1,
    itemsPerPage: number,
    searchText?: string,
    courseCompletion?: number,
    courseEngagement?: number,
    projectDegree?: number,
    teamProjectDegree?: number,
    expectedTypeWorkId?: string,
    expectedContractTypeId?: string,
    expectedSalaryMin?: number,
    expectedSalaryMax?: number,
    canTakeApprenticeship?: number,
    monthsOfCommercialExp?: number,
  ): Promise<PaginatedFilteredStudentsResponse> {
    const totalItems = await this.datasource
      .createQueryBuilder(Students, 'students')
      .leftJoinAndSelect('students.studentsProfile', 'studentsProfile')
      .leftJoinAndSelect(
        'students.expectedContractType',
        'expectedContractType',
      )
      .leftJoinAndSelect('students.expectedTypeWork', 'expectedTypeWork')
      .where(`MATCH(firstName) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(lastName) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(bio) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(education) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(courses) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(
        `MATCH(workExperience) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .orWhere(
        `MATCH(targetWorkCity) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .andWhere('students.courseCompletion = :courseCompletion', {
        courseCompletion,
      })
      .andWhere('students.courseEngagement = :courseEngagement', {
        courseEngagement,
      })
      .andWhere('students.projectDegree = :projectDegree', {
        projectDegree,
      })
      .andWhere('students.teamProjectDegree = :teamProjectDegree', {
        teamProjectDegree,
      })
      .andWhere('expectedTypeWork.id = :id', {
        id: expectedTypeWorkId,
      })
      .andWhere('expectedContractType.id = :id', { id: expectedContractTypeId })

      .andWhere('studentsProfile.expectedSalary >= :expectedSalaryMin', {
        expectedSalaryMin,
      })
      .andWhere('studentsProfile.expectedSalary <= :expectedSalaryMax', {
        expectedSalaryMax,
      })
      .andWhere(
        'studentsProfile.canTakeApprenticeship = :canTakeApprenticeship',
        {
          canTakeApprenticeship,
        },
      )
      .andWhere(
        'studentsProfile.monthsOfCommercialExp = :monthsOfCommercialExp',
        {
          monthsOfCommercialExp,
        },
      )
      .getCount();

    const filteredStudents = await this.datasource
      .createQueryBuilder(Students, 'students')
      .leftJoinAndSelect('students.studentsProfile', 'studentsProfile')
      .leftJoinAndSelect(
        'students.expectedContractType',
        'expectedContractType',
      )
      .leftJoinAndSelect('students.expectedTypeWork', 'expectedTypeWork')
      .where(`MATCH(firstName) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(lastName) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(bio) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(education) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH(courses) AGAINST ('${searchText}' IN BOOLEAN MODE)`)
      .orWhere(
        `MATCH(workExperience) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .orWhere(
        `MATCH(targetWorkCity) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .andWhere('students.courseCompletion = :courseCompletion', {
        courseCompletion,
      })
      .andWhere('students.courseEngagement = :courseEngagement', {
        courseEngagement,
      })
      .andWhere('students.projectDegree = :projectDegree', {
        projectDegree,
      })
      .andWhere('students.teamProjectDegree = :teamProjectDegree', {
        teamProjectDegree,
      })
      .andWhere('expectedTypeWork.id = :id', {
        id: expectedTypeWorkId,
      })
      .andWhere('expectedContractType.id = :id', { id: expectedContractTypeId })

      .andWhere('studentsProfile.expectedSalary >= :expectedSalaryMin', {
        expectedSalaryMin,
      })
      .andWhere('studentsProfile.expectedSalary <= :expectedSalaryMax', {
        expectedSalaryMax,
      })
      .andWhere(
        'studentsProfile.canTakeApprenticeship = :canTakeApprenticeship',
        {
          canTakeApprenticeship,
        },
      )
      .andWhere(
        'studentsProfile.monthsOfCommercialExp = :monthsOfCommercialExp',
        {
          monthsOfCommercialExp,
        },
      )
      .offset(itemsPerPage * (currentPage - 1))
      .limit(itemsPerPage)
      .getMany();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      filteredStudents,
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
        expectedTypeWork: true,
      },
      where: {
        id,
      },
    });
    if (!findStudent) {
      return {
        success: false,
        message: `Student o podanym ID: ${id} nie istnieje!`,
      };
    }

    if (findStudent.expectedContractType === null) {
      const studentTypeContract = new ExpectedContractType();
      studentTypeContract.id = updateStudentProfile.expectedContractType;

      findStudent.expectedContractType = studentTypeContract;

      await Students.save(findStudent);
    }

    if (findStudent.expectedTypeWork === null) {
      const studentTypeWork = new ExpectedTypeWork();
      studentTypeWork.id = updateStudentProfile.expectedTypeWork;

      findStudent.expectedTypeWork = studentTypeWork;

      await Students.save(findStudent);
    }

    const findProfile = await Students.findOne({
      relations: {
        studentsProfile: true,
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
      } = updateStudentProfile;

      findStudent.bonusProjectUrls = bonusProjectUrls;

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
        expectedTypeWork,
      } = updateStudentProfile;

      findStudent.bonusProjectUrls = bonusProjectUrls;
      findStudent.expectedContractType.id = expectedContractType;
      findStudent.expectedTypeWork.id = expectedTypeWork;

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
