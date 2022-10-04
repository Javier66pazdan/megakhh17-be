import { Test, TestingModule } from '@nestjs/testing';
import { StudentsProfileController } from './students_profile.controller';
import { StudentsProfileService } from './students_profile.service';

describe('StudentsProfileController', () => {
  let controller: StudentsProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsProfileController],
      providers: [StudentsProfileService],
    }).compile();

    controller = module.get<StudentsProfileController>(
      StudentsProfileController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
