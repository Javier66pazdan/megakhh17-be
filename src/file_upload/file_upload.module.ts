import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { UserModule } from '../user/user.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [CsvModule, UserModule, StudentsModule],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
