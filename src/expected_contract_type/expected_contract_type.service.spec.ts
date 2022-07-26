import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedContactTypeService } from './expected_contract_type.service';

describe('ExpectedContactTypeService', () => {
  let service: ExpectedContactTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedContactTypeService],
    }).compile();

    service = module.get<ExpectedContactTypeService>(ExpectedContactTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
