import { Test, TestingModule } from '@nestjs/testing';
import { StudentsHrsService } from './students_hrs.service';

describe('StudentsHrsService', () => {
  let service: StudentsHrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsHrsService],
    }).compile();

    service = module.get<StudentsHrsService>(StudentsHrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
