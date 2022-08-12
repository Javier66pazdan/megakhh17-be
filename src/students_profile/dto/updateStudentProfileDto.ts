import { Apprenticeship } from '../students_profile.entity';

export class UpdateStudentProfileDto {
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
  canTakeApprenticeship: Apprenticeship;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  bonusProjectUrls: string;
  expectedContractType: string;
  expectedTypeWork: string;
}
