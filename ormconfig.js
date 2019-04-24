module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};