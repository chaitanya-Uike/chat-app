const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

const db = {
  User: require("./user")(sequelize, Sequelize.DataTypes),
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].hasOwnProperty("associate")) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
