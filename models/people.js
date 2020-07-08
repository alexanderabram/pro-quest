module.exports = function(sequelize, DataTypes) {
  const People = sequelize.define("People", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING
    },
    score: {
      type: DataTypes.INTEGER
    }
  });
  return People;
};
