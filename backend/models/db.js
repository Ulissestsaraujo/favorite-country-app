const { Sequelize } = require("sequelize");

console.log(process.env.DB_HOST);
const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "db",
  port: 5432,
  logging: false,
});

module.exports = { sequelize };
