import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsProfileDto } from './create-students_profile.dto';

export class UpdateStudentsProfileDto extends PartialType(CreateStudentsProfileDto) {}
