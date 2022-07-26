import { Module } from '@nestjs/common';
import { ExpectedContractTypeController } from './expected_contract_type.controller';
import { ExpectedContractTypeService } from './expected_contract_type.service';

@Module({
  controllers: [ExpectedContractTypeController],
  providers: [ExpectedContractTypeService]
})
export class ExpectedContractTypeModule {}
