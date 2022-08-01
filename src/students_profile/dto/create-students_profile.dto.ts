import {Students} from "../../students/students.entity";

export class CreateStudentsProfileDto {
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  bio: string;
  githubUsername: string;
  portfolioUrls: string;
  projectUrls: string;
  targetWorkCity: string;
  expectedSalary: number;
  canTakeApprenticeship: number;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
}

export type UpdateProfile = CreateStudentsProfileDto, Students
