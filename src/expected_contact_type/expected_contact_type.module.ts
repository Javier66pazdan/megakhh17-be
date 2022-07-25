import { Module } from '@nestjs/common';
import { ExpectedContactTypeController } from './expected_contact_type.controller';
import { ExpectedContactTypeService } from './expected_contact_type.service';

@Module({
  controllers: [ExpectedContactTypeController],
  providers: [ExpectedContactTypeService]
})
export class ExpectedContactTypeModule {}
