import { Injectable } from '@nestjs/common';
import { CreateExpectedTypeWorkDto } from './dto/create-expected_type_work.dto';
import { UpdateExpectedTypeWorkDto } from './dto/update-expected_type_work.dto';

@Injectable()
export class ExpectedTypeWorkService {
  create(createExpectedTypeWorkDto: CreateExpectedTypeWorkDto) {
    return 'This action adds a new expectedTypeWork';
  }

  findAll() {
    return `This action returns all expectedTypeWork`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expectedTypeWork`;
  }

  update(id: number, updateExpectedTypeWorkDto: UpdateExpectedTypeWorkDto) {
    return `This action updates a #${id} expectedTypeWork`;
  }

  remove(id: number) {
    return `This action removes a #${id} expectedTypeWork`;
  }
}
