import { Test, TestingModule } from '@nestjs/testing';
import { ExpectedTypeWorkController } from './expected_type_work.controller';

describe('ExpectedTypeWorkController', () => {
  let controller: ExpectedTypeWorkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpectedTypeWorkController],
    }).compile();

    controller = module.get<ExpectedTypeWorkController>(
      ExpectedTypeWorkController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
