module.exports = function(sequelize, DataTypes) {
  var JournalTags = sequelize.define("JournalTags", {
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tag",
        key: "id"
      }
    },
    journalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Journal",
        key: "id"
      }
    }
  });
  return JournalTags;
};
