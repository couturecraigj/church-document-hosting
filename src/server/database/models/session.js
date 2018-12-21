const session = (sequelize, Sequelize) => {
  const Session = sequelize.define('Session', {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
  });

  Session.associate = () => {
    // Session.hasMany(models.Message);
  };

  Session.extendDefaultFields = function extendDefaultFields(
    defaults,
    session
  ) {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId
    };
  };

  return Session;
};

export default session;
