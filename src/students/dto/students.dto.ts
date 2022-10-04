import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class StudentsDto {
  @Length(1, 1)
  @IsNumberString()
  @IsInt()
  @Min(0)
  @Max(100)
  courseCompletion: number;

  @Length(1, 1)
  @IsNumberString()
  @IsInt()
  @Min(0)
  @Max(100)
  courseEngagement: number;

  @Length(1, 1)
  @IsNumberString()
  @IsInt()
  @Min(0)
  @Max(100)
  projectDegree: number;

  @Length(1, 1)
  @IsNumberString()
  @IsInt()
  @Min(0)
  @Max(100)
  teamProjectDegree: number;

  @IsNotEmpty()
  bonusProjectUrls: string;

  @IsNotEmpty()
  userId: string;
}
