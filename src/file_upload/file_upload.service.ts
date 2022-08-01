import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { Readable } from 'stream';

class Student {
  imie: string;
  nazwisko: string;
  rola: string;
}

@Injectable()
export class FileUploadService {
  constructor(private readonly csvParser: CsvParser) {}

  bufferToStream(buffer: Buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async readCsv(file: Express.Multer.File) {
    const buffer = file.buffer;
    const stream = await this.bufferToStream(buffer);

    const csvData = await this.csvParser.parse(stream, Student);

    console.log(csvData);

    return csvData;
  }
}
