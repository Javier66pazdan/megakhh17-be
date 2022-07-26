import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';
import { StudentsProfile } from './students_profile.entity';

@Injectable()
export class StudentsProfileService {
  async create(newProfile: CreateStudentsProfileDto): Promise<StudentsProfile> {
    const studentProfile = new StudentsProfile();

    console.log('cos nie działa');

    const {
      email,
      tel,
      firstName,
      lastName,
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
    } = newProfile;

    studentProfile.email = email;
    studentProfile.tel = tel;
    studentProfile.firstName = firstName;
    studentProfile.lastName = lastName;
    studentProfile.bio = bio;
    studentProfile.githubUsername = githubUsername;
    studentProfile.portfolioUrls = portfolioUrls;
    studentProfile.projectUrls = projectUrls;
    studentProfile.targetWorkCity = targetWorkCity;
    studentProfile.expectedSalary = expectedSalary;
    studentProfile.canTakeApprenticeship = canTakeApprenticeship;
    studentProfile.monthsOfCommercialExp = monthsOfCommercialExp;
    studentProfile.education = education;
    studentProfile.workExperience = workExperience;
    studentProfile.courses = courses;

    await studentProfile.save();
    return studentProfile;
  }

  findAll() {
    return `This action returns all studentsProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentsProfile`;
  }

  update(id: number, updateNewProfile: UpdateStudentsProfileDto) {
    return `This action updates a #${id} studentsProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentsProfile`;
  }
}
