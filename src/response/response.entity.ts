import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { EntityParent as TimeEntity } from '@pardjs/common';

import { ConfigEntity } from '../config';

@Entity()
export class ResponseEntity extends TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'config_id' })
  @ManyToOne(() => ConfigEntity, (config: ConfigEntity) => config.responses)
  config: ConfigEntity;

  @Column({ type: 'jsonb' })
  content: object;
}
