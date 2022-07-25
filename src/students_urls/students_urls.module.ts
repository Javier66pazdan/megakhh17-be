import { Module } from '@nestjs/common';
import { StudentsUrlsController } from './students_urls.controller';
import { StudentsUrlsService } from './students_urls.service';

@Module({
  controllers: [StudentsUrlsController],
  providers: [StudentsUrlsService]
})
export class StudentsUrlsModule {}
