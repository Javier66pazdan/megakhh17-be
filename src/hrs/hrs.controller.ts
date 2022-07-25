import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import {HrsService} from "./hrs.service";
import {GetHrsResponse} from "../interfaces/hrs";
import {RegisterDto} from "../user/dto/register.dto";
import {RegisterUserResponse} from "../interfaces/user";
import {RegisterHrsDto} from "./dto/registerHrs.dto";

@Controller('hrs')
export class HrsController {

    constructor(
        @Inject(HrsService) private hrsService: HrsService,
    ) {
    }

    @Post('/register')
    register(
        @Body() newHr: RegisterHrsDto,
    ): Promise<GetHrsResponse> {
        return this.hrsService.register(newHr);
    }

    @Get('/users/:hrId')
    hrAndUsers(
        @Param('hrId') hrId: string
    ): Promise<GetHrsResponse> {
        return this.hrsService.getHrAndUsers(hrId)
    }
}
