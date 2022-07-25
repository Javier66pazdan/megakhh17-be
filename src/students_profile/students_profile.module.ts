import { Module } from '@nestjs/common';
import { StudentsProfileService } from './students_profile.service';
import { StudentsProfileController } from './students_profile.controller';

@Module({
  controllers: [StudentsProfileController],
  providers: [StudentsProfileService]
})
export class StudentsProfileModule {}
