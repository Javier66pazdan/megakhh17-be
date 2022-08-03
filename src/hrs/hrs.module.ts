import { Module } from '@nestjs/common';
import { HrsController } from './hrs.controller';
import { HrsService } from './hrs.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [HrsController],
  providers: [HrsService],
  exports: [HrsService],
})
export class HrsModule {}
