import { Injectable } from '@nestjs/common';
import {GetHrsResponse} from "../interfaces/hrs";
import {Hrs} from "./hrs.entity";
import {RegisterHrsDto} from "./dto/registerHrs.dto";

@Injectable()
export class HrsService {

    async register(newHr: RegisterHrsDto): Promise<GetHrsResponse> {
        const hr = new Hrs();
        hr.fullName = newHr.fullName;
        hr.company = newHr.company;
        hr.maxReservedStudents = newHr.maxReservedStudents;

        await hr.save();
        return hr;
    }

    async getHrAndUsers(id: string): Promise<GetHrsResponse> {
        const hrToGet = await Hrs.findOne({where: {id}, relations: ['user']});
        if (!hrToGet) {
            return {
                success: false,
                message: `Podane ID: '${id}' nie istnieje!`
            }
        }
        return hrToGet;
    }

    async getOneHr(id: string): Promise<Hrs> {
        return await Hrs.findOne({where: {id}});

    }
}
