import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpectedTypeWorkService } from './expected_type_work.service';
import { CreateExpectedTypeWorkDto } from './dto/create-expected_type_work.dto';
import { UpdateExpectedTypeWorkDto } from './dto/update-expected_type_work.dto';

@Controller('expected-type-work')
export class ExpectedTypeWorkController {
  constructor(private readonly expectedTypeWorkService: ExpectedTypeWorkService) {}

  @Post()
  create(@Body() createExpectedTypeWorkDto: CreateExpectedTypeWorkDto) {
    return this.expectedTypeWorkService.create(createExpectedTypeWorkDto);
  }

  @Get()
  findAll() {
    return this.expectedTypeWorkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expectedTypeWorkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpectedTypeWorkDto: UpdateExpectedTypeWorkDto) {
    return this.expectedTypeWorkService.update(+id, updateExpectedTypeWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expectedTypeWorkService.remove(+id);
  }
}
