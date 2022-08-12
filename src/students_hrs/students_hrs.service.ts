import { Inject, Injectable } from '@nestjs/common';
import { CreateStudentsHrDto } from './dto/create-students_hr.dto';
import { UpdateStudentsHrDto } from './dto/update-students_hr.dto';
import {
  HrRemoveStudentResponse,
  PaginatedHrAndStudentsResponse,
  StudentsHrsResponse,
} from '../interfaces/students_hrs';
import { StudentsHrs } from './students_hrs.entity';
import { StudentsService } from '../students/students.service';
import { HrsService } from '../hrs/hrs.service';
import { DataSource } from 'typeorm';
import { Students } from '../students/students.entity';
import { Hrs } from '../hrs/hrs.entity';
import { count } from 'rxjs';

@Injectable()
export class StudentsHrsService {
  constructor(
    @Inject(StudentsService) private studentsService: StudentsService,
    @Inject(HrsService) private hrsService: HrsService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  async getHrStudents(
    id: string,
    currentPage = 1,
    itemsPerPage,
  ): Promise<PaginatedHrAndStudentsResponse> {
    const totalItems = await this.dataSource
      .createQueryBuilder(StudentsHrs, 'studentsHrs')
      .where('studentsHrs.hrsId = :studentsHrsHrsId', { studentsHrsHrsId: id })
      .getCount();

    const students = await this.dataSource
      .createQueryBuilder(StudentsHrs, 'studentsHrs')
      .select([
        'studentsHrs.createdAt',
        'studentsProfile.firstName',
        'studentsProfile.lastName',
        'students.courseCompletion',
        'students.courseEngagement',
        'students.projectDegree',
        'students.teamProjectDegree',
        'expectedContractType.typeContract',
        'studentsProfile.targetWorkCity',
        'studentsProfile.expectedSalary',
        'studentsProfile.canTakeApprenticeship',
        'studentsProfile.monthsOfCommercialExp',
        'studentsProfile.githubUsername',
        'studentsProfile.githubPhotoUrl',
      ])
      .where('studentsHrs.hrsId = :studentsHrsHrsId', {
        studentsHrsHrsId: id,
      })
      .leftJoin('studentsHrs.students', 'students')
      .leftJoin('students.studentsProfile', 'studentsProfile')
      .leftJoin('students.expectedContractType', 'expectedContractType')
      .offset(itemsPerPage * (currentPage - 1))
      .limit(itemsPerPage)
      .execute();

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      students,
      totalItems,
      totalPages,
      itemsPerPage,
      currentPage,
    };
  }

  async create(
    createStudentsHrDto: CreateStudentsHrDto,
  ): Promise<StudentsHrsResponse> {
    const { hrId, studentId } = createStudentsHrDto;

    const hr = await Hrs.findOne({ where: { id: hrId } });
    const student = await Students.findOne({ where: { id: studentId } });

    const findStudentHr = await StudentsHrs.findOne({
      relations: {
        students: true,
        hrs: true,
      },
      where: {
        students: {
          id: studentId,
        },
        hrs: {
          id: hrId,
        },
      },
    });
    if (findStudentHr) {
      return {
        success: false,
        message: `Student o podanym ID jest już przypisany do HR o podanym ID`,
      };
    }

    if (!hr) {
      return {
        success: false,
        message: `HR o podanym ID: ${hrId} nie istnieje!`,
      };
    } else if (!student) {
      return {
        success: false,
        message: `Student o podanym ID: ${studentId} nie istnieje!`,
      };
    } else {
      const reservedStudents = await this.dataSource
        .createQueryBuilder(StudentsHrs, 'studentsHrs')
        .where('studentsHrs.hrsId = :studentsHrsHrsId', {
          studentsHrsHrsId: hrId,
        })
        .getCount();

      const maxResStudents = await this.dataSource
        .createQueryBuilder(Hrs, 'hrs')
        .select('hrs.maxReservedStudents')
        .where('hrs.id = :id', {
          id: hrId,
        })
        .getOne();

      if (reservedStudents >= maxResStudents.maxReservedStudents) {
        return {
          success: false,
          message: `Niestety zarezerwowałeś już maksymalną ilość studentów: ${maxResStudents.maxReservedStudents}!`,
        };
      }

      const studentHr = new StudentsHrs();
      await studentHr.save();

      studentHr.hrs = hr;
      studentHr.students = student;
      await studentHr.save();

      student.status = 2;
      await student.save();

      return {
        success: true,
        message: `Student o ID: ${studentId} został pomyślnie przypisany do HR o ID: ${hrId}`,
      };
    }
  }

  findOne(id: string) {}

  update(id: number, updateStudentsHrDto: UpdateStudentsHrDto) {
    return `This action updates a #${id} studentsHr`;
  }

  async removeHrStudent(
    studentId: string,
    hrId: string,
  ): Promise<HrRemoveStudentResponse> {
    const findStudent = await StudentsHrs.findOne({
      relations: {
        students: true,
      },
      where: {
        students: {
          id: studentId,
        },
      },
    });

    if (!findStudent) {
      return {
        success: false,
        message: `Student o podanym ID: ${studentId} nie istnieje na liście zarezerwowanych do rozmowy!`,
      };
    }
    await this.dataSource
      .createQueryBuilder(StudentsHrs, 'studentsHrs')
      .leftJoin('studentsHrs.students', 'students')
      .leftJoin('studentsHrs.hrs', 'hrs')
      .delete()
      .from(StudentsHrs)
      .where('students.id = :studentsId', { studentsId: studentId })
      .andWhere('hrs.id = :hrsId', { hrsId: hrId })
      .execute();

    return {
      success: true,
      message: `Student o ID: ${studentId} został usunięty z listy studentów do rozmowy`,
    };
  }
}
