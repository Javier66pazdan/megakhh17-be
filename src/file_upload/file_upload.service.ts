import { Inject, Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import { Readable } from 'stream';
import { UserService } from '../user/user.service';
import { StudentsService } from '../students/students.service';
class Student {
  lp: string;
  email: string;
  courseCompletion: string;
  courseEngagement: string;
  projectDegree: string;
  teamProjectDegree: string;
  bonusProjectUrls: string;
}

@Injectable()
export class FileUploadService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(StudentsService) private readonly studentsService: StudentsService,
    private readonly csvParser: CsvParser,
  ) {}

  bufferToStream(buffer: Buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async readCsvAndSaveUser(file: Express.Multer.File) {
    const buffer = file.buffer;
    const stream = await this.bufferToStream(buffer);

    const csvData = await this.csvParser.parse(stream, Student);

    const userRoleName = 'student'; // from csv it will be always studnet
    const userGeneratedPwd = '123456'; // @TODO: Change it to a random password

    for (const student of csvData.list) {
      const userDto = {
        email: student.email,
        pwd: userGeneratedPwd,
        roleName: userRoleName,
      };

      const newUser = await this.userService.register(userDto);

      if (!('id' in newUser)) {
        return {
          message: newUser.message,
        };
      }

      if (newUser) {
        //@TODO: Save student
        const studentDto = {
          courseCompletion: student.courseCompletion,
          courseEngagement: student.courseEngagement,
          projectDegree: student.projectDegree,
          teamProjectDegree: student.teamProjectDegree,
          bonusProjectUrls: student.bonusProjectsUrls,
          userId: newUser.id,
        };

        await this.studentsService.addStudent(studentDto);
      }
    }

    console.log(csvData.list);

    return csvData;
  }
}
