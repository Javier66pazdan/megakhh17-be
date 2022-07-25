import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class ExpectedTypeWork extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 25,
    nullable: false,
    default: 'Bez znaczenia',
  })
  typeWork: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
