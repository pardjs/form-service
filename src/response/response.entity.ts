import { EntityParent as TimeEntity } from '@pardjs/common';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConfigEntity } from '../config/config.entity';

@Entity()
export class ResponseEntity extends TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'config_id' })
  @ManyToOne(() => ConfigEntity, (config: ConfigEntity) => config.responses)
  @JoinColumn({ name: 'config_id' })
  config: ConfigEntity | number;

  @Column({ type: 'jsonb' })
  content: object;
}
