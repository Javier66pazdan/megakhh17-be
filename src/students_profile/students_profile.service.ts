import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';
import { StudentsProfile } from './students_profile.entity';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';
import { UpdateStudentProfileDto } from './dto/updateStudentProfileDto';
import { User } from '../user/user.entity';
import { Students } from '../students/students.entity';

@Injectable()
export class StudentsProfileService {
  async create(
    newProfile: CreateStudentsProfileDto,
  ): Promise<{ message: string }> {
    const studentProfile = new StudentsProfile();

    const { registerToken } = newProfile;

    const user = await User.findOne({ where: { registerToken } });

    if (!user) {
      return {
        message: 'Użytkownik z podanym tokenem nie istnieje.',
      };
    }

    user.registerToken = null;
    await user.save();

    const userStudent = await User.createQueryBuilder('user')
      .leftJoinAndSelect('user.students', 'students')
      .where('user.id = :id', { id: user.id })
      .getOne();

    const student = await Students.findOne({
      where: { id: userStudent.students.id },
    });

    const {
      email,
      tel,
      firstName,
      lastName,
      bio,
      githubUsername,
      githubPhotoUrl,
      portfolioUrls,
      projectUrls,
      targetWorkCity,
      expectedSalary,
      canTakeApprenticeship,
      monthsOfCommercialExp,
      education,
      workExperience,
      courses,
    } = newProfile;

    studentProfile.email = email;
    studentProfile.tel = tel;
    studentProfile.firstName = firstName;
    studentProfile.lastName = lastName;
    studentProfile.bio = bio;
    studentProfile.githubUsername = githubUsername;
    studentProfile.githubPhotoUrl = githubPhotoUrl;
    studentProfile.portfolioUrls = portfolioUrls;
    studentProfile.projectUrls = projectUrls;
    studentProfile.targetWorkCity = targetWorkCity;
    studentProfile.expectedSalary = expectedSalary;
    studentProfile.canTakeApprenticeship = canTakeApprenticeship;
    studentProfile.monthsOfCommercialExp = monthsOfCommercialExp;
    studentProfile.education = education;
    studentProfile.workExperience = workExperience;
    studentProfile.courses = courses;

    const studentProfileCreated = await studentProfile.save();

    student.studentsProfile = studentProfileCreated;
    await student.save();

    return {
      message: 'Profil utworzony.',
    };
  }

  findAll() {
    return `This action returns all studentsProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentsProfile`;
  }

  // async update(
  //   id: string,
  //   updateProfile: UpdateStudentProfileDto,
  // ): Promise<StudentsProfileUpdateResponse> {
  //   const profileToUpdate = await StudentsProfile.findOne({
  //     relations: {
  //       students: true,
  //     },
  //     where: {
  //       students: { id },
  //     },
  //   });
  //   if (!profileToUpdate) {
  //     return {
  //       success: false,
  //       message: `Student o podanym ID: ${id} nie istnieje!`,
  //     };
  //   } else {
  //     await StudentsProfile.update(id, updateProfile);
  //   }
  //   return {
  //     success: true,
  //     message: `Profil studenta o podanym ID: ${id} został zaktualizowany.`,
  //   };
  // }

  remove(id: number) {
    return `This action removes a #${id} studentsProfile`;
  }
}
