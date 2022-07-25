import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpectedContractTypeService } from './expected_contract_type.service';
import { CreateExpectedContractTypeDto } from './dto/create-expected_contract_type.dto';
import { UpdateExpectedContractTypeDto } from './dto/update-expected_contract_type.dto';

@Controller('expected-contract-type')
export class ExpectedContractTypeController {
  constructor(private readonly expectedContractTypeService: ExpectedContractTypeService) {}

  @Post()
  create(@Body() createExpectedContractTypeDto: CreateExpectedContractTypeDto) {
    return this.expectedContractTypeService.create(createExpectedContractTypeDto);
  }

  @Get()
  findAll() {
    return this.expectedContractTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expectedContractTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpectedContractTypeDto: UpdateExpectedContractTypeDto) {
    return this.expectedContractTypeService.update(+id, updateExpectedContractTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expectedContractTypeService.remove(+id);
  }
}
