const { Sequelize } = require("sequelize");
require("dotenv").config()
const database_url = process.env.DATABASE_URL
const db = new Sequelize(
`${database_url}`
);
const authenticateDb = async () => {
  try {
    await db.authenticate();
    console.log("db conectada");
  } catch (error) {
    console.error("no se pudo conectar a la db", error);
  }
};

module.exports = { db };
