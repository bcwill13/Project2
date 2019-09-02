module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("Journal", {
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
      defaultValue: "No Title"
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
      through: "JournalTags",
      as: "tags",
      foreignKey: "journalId"
    });
  };
  // LINKS JOURNALS TO A USER. ONLY IMPLEMENT AFTER POSTING WORKS
  // Journal.associate = function(models) {
  //   Journal.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  return Journal;
};
