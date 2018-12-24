const phone = (sequelize, Sequelize) => {
  const Phone = sequelize.define('phone', {
    number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: Sequelize.STRING
    }
  });

  Phone.associate = () => {
    // Phone.hasMany(models.Message);
  };

  Phone.beforeCreate(async phone => {
    phone.number = phone.number.replace(/-\(\)\+\w/g, '');
  });

  return Phone;
};

export default phone;
