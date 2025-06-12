module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('leraar', 'leerling')
  });

  User.associate = models => {
    User.belongsTo(models.Klas);
    User.hasMany(models.Cijfer, { foreignKey: 'leerlingId' });
  };

  return User;
};
