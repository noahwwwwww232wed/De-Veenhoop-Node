module.exports = (sequelize, DataTypes) => {
  const Cijfer = sequelize.define('Cijfer', {
    vak: DataTypes.STRING,
    waarde: DataTypes.FLOAT,
    datum: DataTypes.DATE
  });

  Cijfer.associate = models => {
    Cijfer.belongsTo(models.User, { as: 'leerling', foreignKey: 'leerlingId' });
  };

  return Cijfer;
};
