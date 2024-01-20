import Sequelize from 'sequelize';
import db from 'utils/sequelize';

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  invitedById: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  modifiedBy: Sequelize.DATE,
});

export default User;
