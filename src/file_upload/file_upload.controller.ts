import {
  Controller,
  Inject,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';
import { fileFilter } from '../utils/file-filter';

@Controller('file')
export class FileUploadController {
  constructor(
    @Inject(FileUploadService)
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      // file is the name of the field from the HTML form that will hold file
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 15000 })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return this.fileUploadService.readCsvAndSaveUser(file);
  }
}
