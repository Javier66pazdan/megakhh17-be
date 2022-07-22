import { Test, TestingModule } from '@nestjs/testing';
import { StudentsHrsController } from './students_hrs.controller';
import { StudentsHrsService } from './students_hrs.service';

describe('StudentsHrsController', () => {
  let controller: StudentsHrsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsHrsController],
      providers: [StudentsHrsService],
    }).compile();

    controller = module.get<StudentsHrsController>(StudentsHrsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
