module.exports = {
  type: 'postgres',
  url: process.env.DB_URL || 'postgres://dozto:Passw0rd@localhost:5432/form',
  entities: [
    process.env.NODE_ENV === 'production'
      ? 'dist/**/*.entity.ts'
      : 'src/**/*.entity.ts',
  ],
  synchronize: true,
};
