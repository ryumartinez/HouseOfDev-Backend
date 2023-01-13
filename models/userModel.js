const Sequelize = require("sequelize");
const { db } = require("../db");

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: Sequelize.DataTypes.STRING,
    },
    password: {
      type: Sequelize.DataTypes.STRING,
    },
    role: {
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
    },
    imageUrl: {
      type: Sequelize.DataTypes.STRING,
    },
    telefono: {
      type: Sequelize.DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);

module.exports = { Users };
