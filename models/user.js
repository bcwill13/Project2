module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });
  User.associate = function(models) {
    User.hasMany(models.Journal, {
      onDelete: "cascade"
    });
  };
  return User;
};
