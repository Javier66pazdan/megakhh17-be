import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedContractTypeService } from './expected_contract_type.service';

describe('ExpectedContractTypeService', () => {
  let service: ExpectedContractTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpectedContractTypeService],
    }).compile();

    service = module.get<ExpectedContractTypeService>(ExpectedContractTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
