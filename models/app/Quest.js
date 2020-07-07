const Sequelize = require("sequelize");
const sequelize = require("../../config/connection");
const Quest = sequelize.define("quest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE
  },
  misId: {
    type: Sequelize.INTEGER
  }
});
Quest.sync();
module.exports = Quest;
