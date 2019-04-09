import { createConnection } from 'typeorm';

// FIXME: 使用config加载db初始数据
export const dbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'dozto',
        password: 'Passw0rd',
        database: 'form',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
