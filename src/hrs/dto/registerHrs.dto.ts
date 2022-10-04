import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterHrsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  pwd: string;

  @IsNotEmpty()
  @Length(3, 255)
  fullName: string;

  @Length(3, 255)
  company: string;

  maxReservedStudents: number;
}
