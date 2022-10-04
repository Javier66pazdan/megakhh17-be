import { Apprenticeship } from '../../interfaces/students';
import { IsEmail, IsEnum, IsInt } from 'class-validator';

export class UpdateStudentProfileDto {
  @IsEmail()
  email: string;

  tel: string;

  bio: string;

  githubUsername: string;

  portfolioUrls: string;

  projectUrls: string;

  targetWorkCity: string;

  @IsInt()
  expectedSalary: number;

  @IsEnum(Apprenticeship)
  canTakeApprenticeship: Apprenticeship;

  @IsInt()
  monthsOfCommercialExp: number;

  education: string;

  workExperience: string;

  courses: string;

  bonusProjectUrls: string;

  expectedContractType: string;

  expectedTypeWork: string;
}
