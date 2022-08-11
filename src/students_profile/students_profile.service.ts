import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { StudentsProfile } from './students_profile.entity';
import { User } from '../user/user.entity';
import { Students } from '../students/students.entity';
import { ExpectedContractType } from '../expected_contract_type/expected_contract_type.entity';
import { ExpectedTypeWork } from '../expected_type_work/expected_type_work.entity';

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
      relations: { expectedContractType: true, expectedTypeWork: true },
      where: { id: userStudent.students.id },
    });

    const studentTypeContract = new ExpectedContractType();
    studentTypeContract.id = newProfile.expectedContractType;
    student.expectedContractType = studentTypeContract;

    const studentTypeWork = new ExpectedTypeWork();
    studentTypeWork.id = newProfile.expectedTypeWork;
    student.expectedTypeWork = studentTypeWork;

    await Students.save(student);

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

    await Students.update(userStudent.students.id, { status: 1 });

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

  remove(id: number) {
    return `This action removes a #${id} studentsProfile`;
  }
}
