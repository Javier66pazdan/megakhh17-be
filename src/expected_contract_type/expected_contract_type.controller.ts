import { Controller, Get, Inject } from '@nestjs/common';
import { ExpectedContractTypeService } from './expected_contract_type.service';
import { AllContractTypeResponse } from '../interfaces/expected_contract_type';

@Controller('expected-contract-type')
export class ExpectedContractTypeController {
  constructor(
    @Inject(ExpectedContractTypeService)
    private expectedContractTypeService: ExpectedContractTypeService,
  ) {}

  @Get('/')
  all(): Promise<AllContractTypeResponse> {
    return this.expectedContractTypeService.getAll();
  }
}
