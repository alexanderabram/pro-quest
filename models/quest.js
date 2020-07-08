module.exports = function(sequelize, DataTypes) {
  const Quest = sequelize.define("Quest", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    }
  });
  Quest.associate = function(models) {
    Quest.belongsTo(models.Mission);
  };
  return Quest;
};
