import { EntityParent as TimeEntity } from '@pardjs/common';
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResponseEntity extends TimeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'client_id' })
  clientId: string;

  @Column({ type: 'jsonb' })
  content: object;
}
