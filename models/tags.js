module.exports = function(sequelize, DataTypes) {
  var Tags = sequelize.define("Tags", {
    tagname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Tags.associate = function(models) {
    // We're saying that a Tag should belong to an Journal
    // A Tag can't be created without an Journal due to the foreign key constraint
    Tags.belongsToMany(models.Journal, {
      through: 'JournalTags',
      as: 'journal',
      foreignKey: 'tagId'
    });
  };
  return Tags;
};
