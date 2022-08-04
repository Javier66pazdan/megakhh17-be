import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';
import { StudentsProfile } from './students_profile.entity';
import { StudentsProfileUpdateResponse } from '../interfaces/students_profile';

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

  async update(
    id: string,
    updateProfile: UpdateStudentsProfileDto,
  ): Promise<StudentsProfileUpdateResponse> {
    const profileToUpdate = await StudentsProfile.findOne({ where: { id } });
    if (!profileToUpdate) {
      return {
        success: false,
        message: `Student o podanym ID: ${id} nie istnieje!`,
      };
    } else {
      await StudentsProfile.update(id, updateProfile);
    }
    return {
      success: true,
      message: `Profil studenta o podanym ID: ${id} został zaktualizowany.`,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} studentsProfile`;
  }
}
