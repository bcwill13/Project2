module.exports = function(
  sequelize
  //, DataTypes
) {
  var JournalTag = sequelize.define("JournalTag", {
    // journalId: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "Journals",
    //     key: "id"
    //   }
    // },
    // tagId: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "Tags",
    //     key: "id"
    //   }
    // }
  });
  return JournalTag;
};
