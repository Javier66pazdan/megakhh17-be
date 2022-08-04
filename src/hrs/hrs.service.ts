import { Inject, Injectable } from '@nestjs/common';
import { GetHrsResponse } from '../interfaces/hrs';
import { Hrs } from './hrs.entity';
import { RegisterHrsDto } from './dto/registerHrs.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class HrsService {
  constructor(@Inject(DataSource) private dataSource: DataSource) {}

  async register(newHr: RegisterHrsDto): Promise<GetHrsResponse> {
    const hr = new Hrs();
    hr.fullName = newHr.fullName;
    hr.company = newHr.company;
    hr.maxReservedStudents = newHr.maxReservedStudents;

    await hr.save();
    return hr;
  }

  async getOneHr(id: string): Promise<Hrs> {
    return await Hrs.findOne({ where: { id } });
  }
}
