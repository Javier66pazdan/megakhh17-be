import { Injectable } from '@nestjs/common';
import { CreateStudentsProfileDto } from './dto/create-students_profile.dto';
import { UpdateStudentsProfileDto } from './dto/update-students_profile.dto';
import {StudentsProfile} from "./students_profile.entity";

@Injectable()
export class StudentsProfileService {

  async create(newProfile: CreateStudentsProfileDto): Promise<StudentsProfile> {
    const studentProfile = new StudentsProfile();
    studentProfile.email = newProfile.email;
    studentProfile.tel = newProfile.tel;
    studentProfile.firstName = newProfile.firstName;
    studentProfile.lastName = newProfile.lastName;
    studentProfile.bio = newProfile.bio;
    studentProfile.githubUsername = newProfile.githubUsername;
    studentProfile.portfolioUrls = newProfile.portfolioUrls;
    studentProfile.projectUrls = newProfile.projectUrls;
    studentProfile.targetWorkCity = newProfile.targetWorkCity;
    studentProfile.expectedSalary = newProfile.expectedSalary;
    studentProfile.canTakeApprenticeship = newProfile.canTakeApprenticeship;
    studentProfile.monthsOfCommercialExp = newProfile.monthsOfCommercialExp;
    studentProfile.education = newProfile.education;
    studentProfile.workExperience = newProfile.workExperience;
    studentProfile.courses = newProfile.courses;

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
