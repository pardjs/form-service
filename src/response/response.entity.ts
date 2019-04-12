import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

import { EntityParent as TimeEntity } from '@pardjs/common';

@Entity()
export class ResponseEntity extends TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'config_id' })
  configId: string;

  @Column({ type: 'jsonb' })
  content: object;
}
