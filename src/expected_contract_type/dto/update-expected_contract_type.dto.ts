import { PartialType } from '@nestjs/mapped-types';
import { CreateExpectedContractTypeDto } from './create-expected_contract_type.dto';

export class UpdateExpectedContractTypeDto extends PartialType(CreateExpectedContractTypeDto) {}
