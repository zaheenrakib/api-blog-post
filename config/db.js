require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "blogdb" ,
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST ,
    dialect: process.env.DB_DIALECT ,
    logging: false, // Disable SQL logging
    pool: {
      max: 5,
      min: 0,
      acquire: 60000, // Increase to 60s
      idle: 10000
    },
    dialectOptions: {
      connectTimeout: 60000 // Increase to 60s
    }
  }
);


module.exports = sequelize;