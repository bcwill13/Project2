module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  // ASSOCIATES USER WITH JOURNAL ENTRIES. ONLY IMPLEMENT AFTER POSTING WORKS
  // User.associate = function(models) {
  //   User.hasMany(models.Journal, {
  //     onDelete: "cascade"
  //   });
  // };
  return User;
};
