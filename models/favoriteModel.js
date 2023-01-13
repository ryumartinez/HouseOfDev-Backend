const Sequelize = require("sequelize");
const { db } = require("../db");
const { Users } = require("./userModel");
const { Properties } = require("./propertyModel");

class Favorites extends Sequelize.Model {}
Favorites.init(
  {},
  {
    sequelize: db,
    tableName: "favorites",
  }
);

Properties.belongsToMany(Users, { through: Favorites });
Users.belongsToMany(Properties, { through: Favorites });

module.exports = { Favorites };
