import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedContractTypeController } from './expected_contract_type.controller';
import { ExpectedContractTypeService } from './expected_contract_type.service';

describe('ExpectedContractTypeController', () => {
  let controller: ExpectedContractTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedContractTypeController],
      providers: [ExpectedContractTypeService],
    }).compile();

    controller = module.get<ExpectedContractTypeController>(ExpectedContractTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
