import { Test, TestingModule } from '@nestjs/testing';
import { StudentsUrlsController } from './students_urls.controller';

describe('StudentsUrlsController', () => {
  let controller: StudentsUrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsUrlsController],
    }).compile();

    controller = module.get<StudentsUrlsController>(StudentsUrlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
