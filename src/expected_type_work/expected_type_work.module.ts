import { Module } from '@nestjs/common';
import { ExpectedTypeWorkController } from './expected_type_work.controller';
import { ExpectedTypeWorkService } from './expected_type_work.service';

@Module({
  controllers: [ExpectedTypeWorkController],
  providers: [ExpectedTypeWorkService]
})
export class ExpectedTypeWorkModule {}
