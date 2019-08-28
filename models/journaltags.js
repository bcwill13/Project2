module.exports = function(sequelize, DataTypes) {
  var JournalTag = sequelize.define("JournalTag", {
    journalId: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  return JournalTag;
};
