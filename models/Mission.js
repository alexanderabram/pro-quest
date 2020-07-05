const Sequelize = require("sequelize");
const db = require("../config/database");
const Mission = db.define("mission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
});

module.exports = Mission;
