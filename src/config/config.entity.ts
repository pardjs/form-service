import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { EntityParent as TimeEntity } from '@pardjs/common';

import { ResponseEntity } from '../response';

@Entity()
export class ConfigEntity extends TimeEntity {
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

  @Column({ name: 'is_recaptcha_required', default: false })
  isReCaptchaRequired?: boolean;

  @Column({ name: 'sender_name', nullable: true })
  senderName?: string;

  @Column({ name: 'sender_email', nullable: true })
  senderEmail?: string;

  @Column({ name: 'mail_title', nullable: true })
  mailTitle?: string;

  @Column({ name: 'template', nullable: true })
  templateName?: string;

  @OneToMany(
    () => ResponseEntity,
    (response: ResponseEntity) => response.config,
  )
  responses: ResponseEntity[];
}
