module.exports = (sequelize, DataTypes) => {
  const Klas = sequelize.define('Klas', {
    naam: DataTypes.STRING
  });

  Klas.associate = models => {
    Klas.hasMany(models.User);
    Klas.belongsTo(models.User, { as: 'leraar' }); // leraarId
  };

  return Klas;
};
