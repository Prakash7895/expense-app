export const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER ?? 'prakash',
  PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME ?? 'expense_db',
  PORT: process.env.DB_PORT ?? 3000,
  dialect: 'postgres',
  // pool: pool,
};
