import { Test, TestingModule } from '@nestjs/testing';
import { StudentsUrlsController } from './students_urls.controller';
import { StudentsUrlsService } from './students_urls.service';

describe('StudentsUrlsController', () => {
  let controller: StudentsUrlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsUrlsController],
      providers: [StudentsUrlsService],
    }).compile();

    controller = module.get<StudentsUrlsController>(StudentsUrlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
