import { Module } from '@nestjs/common';
import { StudentsUrlsService } from './students_urls.service';
import { StudentsUrlsController } from './students_urls.controller';

@Module({
  controllers: [StudentsUrlsController],
  providers: [StudentsUrlsService]
})
export class StudentsUrlsModule {}
