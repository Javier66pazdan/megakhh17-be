import { Injectable } from '@nestjs/common';
import { AllTypeWorkResponse } from '../interfaces/expected_type_work';
import { ExpectedTypeWork } from './expected_type_work.entity';

@Injectable()
export class ExpectedTypeWorkService {
  async getAll(): Promise<AllTypeWorkResponse> {
    return await ExpectedTypeWork.find();
  }
}
