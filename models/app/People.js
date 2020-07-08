const Sequelize = require("sequelize");
const sequelize = require("../../config/connection");
const People = sequelize.define("People", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER
  }
});
People.sync();
module.exports = People;
