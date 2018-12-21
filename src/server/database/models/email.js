const email = (sequelize, Sequelize) => {
  const Email = sequelize.define('email', {
    address: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: Sequelize.STRING
    }
  });

  Email.associate = () => {
    // Email.hasMany(models.Message);
  };

  return Email;
};

export default email;
