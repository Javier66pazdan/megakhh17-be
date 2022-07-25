import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedContactTypeController } from './expected_contact_type.controller';

describe('ExpectedContactTypeController', () => {
  let controller: ExpectedContactTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedContactTypeController],
    }).compile();

    controller = module.get<ExpectedContactTypeController>(ExpectedContactTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
