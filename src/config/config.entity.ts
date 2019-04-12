import { EntityParent, logger } from '@pardjs/common';
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';

@Entity()
export class ConfigEntity extends EntityParent {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ name: 'hash_id', nullable: true })
  hashId: string;

  @Column()
  name: string;

  @Column({ name: 'response_schema', type: 'jsonb', nullable: true })
  responseSchema?: object;

  @Column({ name: 'notify_mails', type: 'jsonb', nullable: true })
  notifyMails?: string[];

  @Column({ name: 'is_notify_by_mail', default: false })
  isNotifyByMail?: boolean;

  @Column({ name: 'is_validate_required', default: false })
  isValidateRequired?: boolean;

  @Column({ name: 'sender_name', nullable: true })
  senderName?: string;

  @Column({ name: 'sender_email', nullable: true })
  senderEmail?: string;

  @Column({ name: 'template', nullable: true })
  templateName?: string;
}
