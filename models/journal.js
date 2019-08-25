module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("Journal", {
    title: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notEmpty: true
      }
    }
  });
  Journal.associate = function(models) {
    Journal.belongsToMany(models.Tag, {
      through: "JournalTag",
      as: "tag",
      foreignKey: "journalId"
    });
  };
  return Journal;
};
