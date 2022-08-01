import { Module } from '@nestjs/common';
import { HrsController } from './hrs.controller';
import { HrsService } from './hrs.service';

@Module({
  controllers: [HrsController],
  providers: [HrsService],
  exports: [HrsService],
})
export class HrsModule {}
