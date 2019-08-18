module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("journal", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Journal;
};
