import { Module } from '@nestjs/common';
import { StudentsHrsService } from './students_hrs.service';
import { StudentsHrsController } from './students_hrs.controller';

@Module({
    controllers: [StudentsHrsController],
    providers: [StudentsHrsService]
})
export class StudentsHrsModule {}