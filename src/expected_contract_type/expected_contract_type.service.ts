import { Injectable } from '@nestjs/common';
import {AllContractTypeResponse} from "../interfaces/expected_contract_type";
import {ExpectedContractType} from "./expected_contract_type.entity";

@Injectable()
export class ExpectedContractTypeService {

    async getAll(): Promise<AllContractTypeResponse> {
        return await ExpectedContractType.find();
    }
}
