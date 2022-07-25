import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentsUrlDto } from './create-students_url.dto';

export class UpdateStudentsUrlDto extends PartialType(CreateStudentsUrlDto) {}
