import { Module } from '@nestjs/common';
import { StudentsHrsService } from './students_hrs.service';
import { StudentsHrsController } from './students_hrs.controller';
import {StudentsModule} from "../students/students.module";
import {HrsModule} from "../hrs/hrs.module";

@Module({
    imports: [
        StudentsModule,
        HrsModule,
    ],
    controllers: [StudentsHrsController],
    providers: [StudentsHrsService],
    exports: [StudentsHrsService],
})
export class StudentsHrsModule {}