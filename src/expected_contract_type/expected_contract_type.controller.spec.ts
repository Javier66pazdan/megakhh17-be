import { Test, TestingModule } from '@nestjs/testing';
import {ExpectedContractTypeController} from './expected_contract_type.controller';

describe('ExpectedContractTypeController', () => {
  let controller: ExpectedContractTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedContractTypeController],
    }).compile();

    controller = module.get<ExpectedContractTypeController>(ExpectedContractTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
