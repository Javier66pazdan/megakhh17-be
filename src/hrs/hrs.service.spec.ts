import { Test, TestingModule } from '@nestjs/testing';
import { HrsService } from './hrs.service';

describe('HrsService', () => {
  let service: HrsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrsService],
    }).compile();

    service = module.get<HrsService>(HrsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
