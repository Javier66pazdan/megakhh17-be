import { Injectable } from '@nestjs/common';
import { CreateExpectedContractTypeDto } from './dto/create-expected_contract_type.dto';
import { UpdateExpectedContractTypeDto } from './dto/update-expected_contract_type.dto';

@Injectable()
export class ExpectedContractTypeService {
  create(createExpectedContractTypeDto: CreateExpectedContractTypeDto) {
    return 'This action adds a new expectedContractType';
  }

  findAll() {
    return `This action returns all expectedContractType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expectedContractType`;
  }

  update(id: number, updateExpectedContractTypeDto: UpdateExpectedContractTypeDto) {
    return `This action updates a #${id} expectedContractType`;
  }

  remove(id: number) {
    return `This action removes a #${id} expectedContractType`;
  }
}
