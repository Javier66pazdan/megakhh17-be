import { Test, TestingModule } from '@nestjs/testing';
import { HrsController } from './hrs.controller';

describe('HrsController', () => {
  let controller: HrsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrsController],
    }).compile();

    controller = module.get<HrsController>(HrsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
