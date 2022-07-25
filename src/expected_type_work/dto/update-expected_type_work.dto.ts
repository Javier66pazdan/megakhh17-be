import { PartialType } from '@nestjs/mapped-types';
import { CreateExpectedTypeWorkDto } from './create-expected_type_work.dto';

export class UpdateExpectedTypeWorkDto extends PartialType(CreateExpectedTypeWorkDto) {}
