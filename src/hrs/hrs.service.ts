import { Inject, Injectable } from '@nestjs/common';
import {
  GetHrsResponse,
  GetOneHrResponse,
  HrsFailedResponse,
} from '../interfaces/hrs';
import { Hrs } from './hrs.entity';
import { RegisterHrsDto } from './dto/registerHrs.dto';
import { DataSource } from 'typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class HrsService {
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async register(newHr: RegisterHrsDto): Promise<GetHrsResponse> {
    const hr = new Hrs();

    const userDto = {
      email: newHr.email,
      pwd: newHr.pwd,
      roleName: 'hr',
    };

    const user = await this.userService.register(userDto);

    if (!user) {
      return {
        success: false,
        message: 'Nie udało się utworzyć konta HR.',
      };
    }

    const findUser = await User.findOne({ where: { email: newHr.email } });

    if (!findUser) {
      return {
        success: false,
        message: 'Nie udało się utworzyć konta HR.',
      };
    }

    hr.fullName = newHr.fullName;
    hr.company = newHr.company;
    hr.maxReservedStudents = newHr.maxReservedStudents;
    hr.user = findUser;

    await hr.save();
    return hr;
  }

  async getOneHr(
    userId: string,
  ): Promise<HrsFailedResponse | GetOneHrResponse> {
    const hr = await Hrs.createQueryBuilder('hr')
      .leftJoinAndSelect('hr.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!hr) {
      return {
        success: false,
        message: 'Podano niepoprawne id użytkownika.',
      };
    }

    const responseData = {
      id: hr.id,
      fullName: hr.fullName,
      company: hr.company,
      // maxReservedStudents: hr.maxReservedStudents,
      // userId: hr.user.id,
      userEmail: hr.user.email,
    };

    return responseData;
  }

  async getAllHrs() {
    return Hrs.find();
  }
}
