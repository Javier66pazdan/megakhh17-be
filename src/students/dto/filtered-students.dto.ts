import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';
import { Apprenticeship } from '../../interfaces/students';

export class FilteredStudentsDto {
  @IsNotEmpty()
  @IsNumberString()
  pageNo = 1;

  @IsNotEmpty()
  @IsNumberString()
  itemsPerPage = 10;

  @IsOptional()
  searchText?: string;

  @IsOptional()
  @IsInt()
  courseCompletion?: number;

  @IsOptional()
  @IsInt()
  courseEngagement?: number;

  @IsOptional()
  @IsInt()
  projectDegree?: number;

  @IsOptional()
  @IsInt()
  teamProjectDegree?: number;

  @IsOptional()
  expectedTypeWorkId?: string;

  @IsOptional()
  expectedContractTypeId?: string;

  @IsOptional()
  @IsInt()
  expectedSalaryMin?: number;

  @IsOptional()
  @IsInt()
  expectedSalaryMax?: number;

  @IsEnum(Apprenticeship)
  canTakeApprenticeship?: Apprenticeship;

  @IsOptional()
  @IsInt()
  monthsOfCommercialExp?: number;
}
