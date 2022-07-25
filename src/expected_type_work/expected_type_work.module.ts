import { Module } from '@nestjs/common';
import { ExpectedTypeWorkService } from './expected_type_work.service';
import { ExpectedTypeWorkController } from './expected_type_work.controller';

@Module({
  controllers: [ExpectedTypeWorkController],
  providers: [ExpectedTypeWorkService]
})
export class ExpectedTypeWorkModule {}
