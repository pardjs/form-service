import { Connection, Repository } from 'typeorm';
import { FormRecord } from './form-record.entity';

export const formProviders = [
  {
    provide: 'FORM_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(FormRecord),
    inject: ['DATABASE_CONNECTION'],
  },
];
