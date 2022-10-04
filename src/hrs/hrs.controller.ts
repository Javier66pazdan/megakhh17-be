import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { HrsService } from './hrs.service';
import {
  GetHrsResponse,
  GetOneHrResponse,
  HrsFailedResponse,
} from '../interfaces/hrs';

import { RegisterHrsDto } from './dto/registerHrs.dto';
import { Hrs } from './hrs.entity';

@Controller('hrs')
export class HrsController {
  constructor(@Inject(HrsService) private hrsService: HrsService) {}

  @Post('/register')
  register(@Body() newHr: RegisterHrsDto): Promise<GetHrsResponse> {
    return this.hrsService.register(newHr);
  }

  @Get('/:id')
  oneHr(
    @Param('id') id: string,
  ): Promise<HrsFailedResponse | GetOneHrResponse> {
    return this.hrsService.getOneHr(id);
  }

  @Get('/')
  getAllHrs(): Promise<Hrs[]> {
    return this.hrsService.getAllHrs();
  }
}
