const Sequelize = require("sequelize");
module.exports = new Sequelize("missions", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: false,
  define: {
    timestamps: false
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
