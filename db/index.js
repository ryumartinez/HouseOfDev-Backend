const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "postgresql://postgres:lSxnDriVGqg1DNujCQ89@containers-us-west-35.railway.app:5877/railway"
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
