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
  canTakeApprenticeship: number;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
}
