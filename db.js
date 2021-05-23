const Sequelize = require("sequelize");
require("dotenv").config();

const userModel = require("./models/user");
const gameModel = require("./models/game");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    operatorsAliases: false,
  }
);

sequelize.authenticate().then(
  function success() {
    console.log("Connected to DB");
  },
  function fail(err) {
    console.log(`Error: ${err}`);
  }
);

sequelize.sync();

const User = userModel(sequelize, Sequelize.DataTypes);
const Game = gameModel(sequelize, Sequelize.DataTypes);

module.exports = {
  User,
  Game,
};