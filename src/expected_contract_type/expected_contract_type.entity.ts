import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Students } from '../students/students.entity';

//
// export enum ContractTypes {
//   ContractOfEmployment = 'Contract of employment',
//   B2B = 'B2B',
//   ContractOfEnterpriseOrMandate = 'Contract of enterprise or mandate',
//   NoPreferences = 'No preferences',
// }

@Entity()
export class ExpectedContractType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 35,
  })
  typeContract: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  createdAt: Date;

  @OneToMany((type) => Students, (entity) => entity.expectedContractType)
  students: Students[];
}
