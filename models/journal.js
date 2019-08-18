module.exports = function(sequelize, DataTypes) {
  var Journal = sequelize.define("Journal", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Journal.associate = function(models) {
    Journal.hasMany(models.Tags, {
      // this was in the example I (TPL) used but we are not wanting to cascade deletes.
      //onDelete: "cascade"
    });
  };
  return Journal;
};
