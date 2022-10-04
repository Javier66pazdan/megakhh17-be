import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedTypeWorkService } from './expected_type_work.service';

describe('ExpectedTypeWorkService', () => {
  let service: ExpectedTypeWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedTypeWorkService],
    }).compile();

    service = module.get<ExpectedTypeWorkService>(ExpectedTypeWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
