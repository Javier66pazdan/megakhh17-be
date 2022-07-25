import { Test, TestingModule } from '@nestjs/testing';
import { StudentsUrlsService } from './students_urls.service';

describe('StudentsUrlsService', () => {
  let service: StudentsUrlsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentsUrlsService],
    }).compile();

    service = module.get<StudentsUrlsService>(StudentsUrlsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
