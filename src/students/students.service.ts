import { Injectable } from '@nestjs/common';
import {Students} from "./students.entity";
import {AllStudentsResponse} from "../interfaces/students";
import {Student} from "../interfaces/students";

@Injectable()
export class StudentsService {

    async getAllStudents(): Promise<AllStudentsResponse> {
        return await Students.find();
    }

    async getOneStudent(id: string): Promise<Students> {
        return await Students.findOne({where: {id}, relations: ['studentsProfile']})
    }
}
