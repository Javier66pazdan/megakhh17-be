import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Students } from './students.entity';
import {
  GetOneStudentResponse,
  GetOneStudentResponseWithErrors,
  GetUpdateStatusResponse,
  PaginatedAllStudentsResponse,
  PaginatedFilteredStudentsResponse,
  Student,
} from '../interfaces/students';
import { DataSource } from 'typeorm';
import { StudentsDto } from './dto/students.dto';
import { User } from '../user/user.entity';
import { UpdateStudentProfileDto } from '../students_profile/dto/updateStudentProfileDto';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { StudentsProfile } from '../students_profile/students_profile.entity';
import { Apprenticeship } from '../interfaces/students';
import { Status } from '../interfaces/students';
import { ExpectedContractType } from '../expected_contract_type/expected_contract_type.entity';
import { ExpectedTypeWork } from '../expected_type_work/expected_type_work.entity';
import { NotFoundException } from '../errors/not-found.exception';

@Injectable()
export class StudentsService {
  constructor(@Inject(DataSource) private datasource: DataSource) {}

  async getAllAvailableStudents(
    currentPage = 1,
    itemsPerPage,
  ): Promise<PaginatedAllStudentsResponse> {
    const totalItems = await this.datasource
      .createQueryBuilder(Students, 'students')
      .where('students.status IN (:...studentsStatus)', {
        studentsStatus: [1, 2],
      })
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
        'expectedTypeWork.typeWork',
      ])
      .where('students.status IN (:...studentsStatus)', {
        studentsStatus: [1, 2],
      })
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .leftJoin('students.expectedContractType', 'expectedContractType')
      .leftJoin('students.expectedTypeWork', 'expectedTypeWork')
      .offset(itemsPerPage * (currentPage - 1))
      .limit(itemsPerPage)
      .getMany();

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
    const findStudent = await Students.findOne({ where: { id } });

    if (!findStudent) {
      throw new HttpException(`Student o podanym ID: ${id} nie istnieje!`, 404);
    }

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
        'expectedContractType.typeContract',
        'expectedTypeWork.typeWork',
      ])
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .leftJoin('students.expectedContractType', 'expectedContractType')
      .leftJoin('students.expectedTypeWork', 'expectedTypeWork')
      .getOne();
  }

  async getOneStudentAndProfile(id: string): Promise<Student> {
    const findStudent = await Students.findOne({ where: { id } });

    if (!findStudent) {
      throw new HttpException(`Student o podanym ID: ${id} nie istnieje!`, 404);
    }

    return await this.datasource
      .createQueryBuilder(Students, 'students')
      .where('students.id = :studentsId', { studentsId: id })
      .select([
        'students.*',
        'studentsProfile.*',
        'expectedContractType.*',
        'expectedTypeWork.*',
      ])
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .leftJoin('students.expectedContractType', 'expectedContractType')
      .leftJoin('students.expectedTypeWork', 'expectedTypeWork')
      .execute();
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
    canTakeApprenticeship?: Apprenticeship,
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
      .orWhere(
        `MATCH(targetWorkCity) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .where('students.status IN (:...studentsStatus)', {
        studentsStatus: [1, 2],
      })
      .andWhere('students.courseCompletion >= :courseCompletion', {
        courseCompletion,
      })
      .andWhere('students.courseEngagement >= :courseEngagement', {
        courseEngagement,
      })
      .andWhere('students.projectDegree >= :projectDegree', {
        projectDegree,
      })
      .andWhere('students.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree,
      })
      .andWhere('expectedTypeWork.id IN(:ids)', {
        ids: String(expectedTypeWorkId)
          .split(',')
          .map((i) => Number(i)),
      })
      .andWhere('expectedContractType.id IN(:id)', {
        id: String(expectedContractTypeId)
          .split(',')
          .map((i) => Number(i)),
      })
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
        'studentsProfile.monthsOfCommercialExp >= :monthsOfCommercialExp',
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
      .orWhere(
        `MATCH(targetWorkCity) AGAINST ('${searchText}' IN BOOLEAN MODE)`,
      )
      .where('students.status IN (:...studentsStatus)', {
        studentsStatus: [1, 2],
      })
      .andWhere('students.courseCompletion >= :courseCompletion', {
        courseCompletion,
      })
      .andWhere('students.courseEngagement >= :courseEngagement', {
        courseEngagement,
      })
      .andWhere('students.projectDegree >= :projectDegree', {
        projectDegree,
      })
      .andWhere('students.teamProjectDegree >= :teamProjectDegree', {
        teamProjectDegree,
      })
      .andWhere('expectedTypeWork.id IN(:ids)', {
        ids: String(expectedTypeWorkId)
          .split(',')
          .map((i) => Number(i)),
      })
      .andWhere('expectedContractType.id IN(:id)', {
        id: String(expectedContractTypeId)
          .split(',')
          .map((i) => Number(i)),
      })
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
        'studentsProfile.monthsOfCommercialExp >= :monthsOfCommercialExp',
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

  async addStudent(newStudent: StudentsDto) {
    const student = new Students();

    const findUser = await User.findOne({ where: { id: newStudent.userId } });

    if (!findUser) {
      throw new HttpException(
        `Użytkownik o podanym ID: ${newStudent.userId} nie istnieje!`,
        404,
      );
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
      throw new HttpException(`Student o podanym ID: ${id} nie istnieje!`, 404);
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

  async updateStatus(
    id: string,
    status: Status,
  ): Promise<GetUpdateStatusResponse> {
    const findStudent = await Students.findOne({
      where: {
        id,
      },
    });
    if (!findStudent) {
      throw new HttpException(`Student o podanym ID: ${id} nie istnieje!`, 404);
    } else {
      await Students.update(id, { status });
    }
    return {
      success: true,
      message: `Status studenta o ID: ${id} został zaktualizowany`,
    };
  }
}
