module.exports = function(sequelize, DataTypes) {
  const Mission = sequelize.define("Mission", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    owners: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    due: {
      type: DataTypes.DATE
    }
  });

  Mission.associate = function(models) {
    Mission.hasMany(models.Quest);
  };
  return Mission;
};
