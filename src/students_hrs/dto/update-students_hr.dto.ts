import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsHrDto } from './create-students_hr.dto';

export class UpdateStudentsHrDto extends PartialType(CreateStudentsHrDto) {}
