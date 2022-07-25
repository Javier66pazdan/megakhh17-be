import { Module } from '@nestjs/common';
import { ExpectedContractTypeService } from './expected_contract_type.service';
import { ExpectedContractTypeController } from './expected_contract_type.controller';

@Module({
  controllers: [ExpectedContractTypeController],
  providers: [ExpectedContractTypeService]
})
export class ExpectedContractTypeModule {}
