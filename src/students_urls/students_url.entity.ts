import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Students_urlsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 36,
    default: null,
  })
  students_id: string;

  // @Column({
  //   length: 255,
  //   nullable: false,
  // })
  // url: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;
}
