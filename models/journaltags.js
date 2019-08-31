module.exports = function(sequelize, DataTypes) {
  var JournalTag = sequelize.define("JournalTag", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    journalId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Journals",
        key: "id"
      }
    },
    tagId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Tags",
        key: "id"
      }
    }
  });
  return JournalTag;
};
