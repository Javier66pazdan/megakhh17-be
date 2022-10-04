import { Apprenticeship } from '../../interfaces/students';

export class CreateStudentsProfileDto {
  registerToken: string;
  email: string;
  tel: string;
  firstName: string;
  lastName: string;
  bio: string;
  githubUsername: string;
  githubPhotoUrl: string;
  portfolioUrls: string;
  projectUrls: string;
  targetWorkCity: string;
  expectedSalary: number;
  canTakeApprenticeship: Apprenticeship;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  expectedContractType: string;
  expectedTypeWork: string;
}
