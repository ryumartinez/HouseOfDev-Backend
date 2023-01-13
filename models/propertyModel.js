const Sequelize = require("sequelize");
const { db } = require("../db");

class Properties extends Sequelize.Model {}
Properties.init(
  {
    name: {
      type: Sequelize.DataTypes.STRING,
    },
    description: {
      type: Sequelize.DataTypes.TEXT,
    },
    imageUrl: {
      type: Sequelize.DataTypes.STRING,
    },
    area: {
      type: Sequelize.DataTypes.STRING,
    },
    direccion: {
      type: Sequelize.DataTypes.STRING,
    },
    habitaciones: {
      type: Sequelize.DataTypes.STRING,
    },
    categoria: {
      type: Sequelize.DataTypes.STRING,
    },
    descriptionFull: {
      type: Sequelize.DataTypes.TEXT,
    },
    sanitarios:{
      type:Sequelize.DataTypes.STRING,
    },
    precio:{
      type:Sequelize.DataTypes.STRING
    }
  },
  {
    sequelize: db,
    tableName: "properties",
  }
);

module.exports = { Properties };
