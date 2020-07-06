const Sequelize = require("sequelize");
const sequelize = require("../../config/connection");
const Mission = sequelize.define("mission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  owners: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE
  },
  due: {
    type: Sequelize.DATE
  }
});
Mission.sync();
module.exports = Mission;
