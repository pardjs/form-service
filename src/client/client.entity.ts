import { EntityParent } from '@pardjs/common';
import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import Hashids from 'hashids';

// FIXME: get secret from process env
const hashids = new Hashids('S3CR3T_T0K3II');

@Entity()
export class ClientEntity extends EntityParent {
  @BeforeInsert()
  createHashId() {
    this.hashId = hashids.encode(
      ...String(this.id)
        .split('')
        .map(item => Number(item)),
    );
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ name: 'hash_id' })
  hashId: string;

  @Column()
  name: string;

  @Column({ name: 'response_schema', type: 'jsonb', nullable: true })
  responseSchema: object;

  @Column({ name: 'notify_mails', type: 'jsonb', array: true, nullable: true })
  notifyMails: string[];

  @Column({ name: 'is_notify_by_mail', default: false })
  isNotifyByMail: boolean;

  @Column({ name: 'is_validate_required', default: false })
  isValidateRequired: boolean;

  @Column({ name: 'sender_name', nullable: true })
  senderName: string;

  @Column({ name: 'sender_email', nullable: true })
  senderEmail: string;

  @Column({ name: 'template', nullable: true })
  templateName: string;
}
