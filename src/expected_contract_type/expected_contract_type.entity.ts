import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ExpectedContractType extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Column({
    length: 25,
    nullable: false,
    default: 'Brak preferencji',
  })
  typeContract: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
