module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("Journal", {
    description: DataTypes.TEXT
  });

  Journal.associate = (models) => {
    Journal.belongsToMany(models.Tags, {
      through: 'JournalTags',
      as : 'tags',
      foreignKey: 'JournalId'
    });
  };
  return Journal;
};
