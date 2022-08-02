import {Controller, Get, Inject} from '@nestjs/common';
import {AllTypeWorkResponse} from "../interfaces/expected_type_work";
import {StudentsService} from "../students/students.service";
import {ExpectedTypeWorkService} from "./expected_type_work.service";

@Controller('expected-type-work')
export class ExpectedTypeWorkController {
    constructor(
        @Inject(ExpectedTypeWorkService) private expectedTypeWorkService: ExpectedTypeWorkService,
    ) {
    }

    @Get('/')
    all(): Promise<AllTypeWorkResponse> {
        return this.expectedTypeWorkService.getAll();
    }
}
