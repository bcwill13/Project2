module.exports = function(sequelize, DataTypes) {
  var JournalTag = sequelize.define("JournalTag", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
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
