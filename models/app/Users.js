const Sequelize = require("sequelize");
const sequelize = require("../../config/connection");
const User = sequelize.define("user", {
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
User.sync();
module.exports = User;
