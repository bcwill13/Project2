module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define("Tags", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1]
      }
    }
  });
  Tag.associate = function(models) {
    // We're saying that a Tag should belong to an Journal
    // A Tag can't be created without an Journal due to the foreign key constraint
    Tag.belongsToMany(models.Journals, {
      through: "JournalTags",
      as: "journals",
      foreignKey: "tagId"
    });
  };
  return Tag;
};
