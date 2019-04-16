module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dozto',
  password: 'Passw0rd',
  database: 'form',
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
};
