import { EntityParent } from '@pardjs/common';
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormRecord extends EntityParent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  clientId: string;

  @Column('jsonb')
  content: object;
}
