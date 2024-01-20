import { dbConfig } from '../config/db.config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: +dbConfig.PORT,
    pool: dbConfig.pool,
  }
);

export default sequelize;
