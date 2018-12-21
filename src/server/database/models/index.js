import user from './user';
import subscription from './subscription';
import email from './email';
import session from './session';
import doc from './doc';

const models = {
  User: user,
  Subscription: subscription,
  Doc: doc,
  Email: email,
  Session: session
};

const configure = (sequelize, Sequelize) => {
  Object.entries(models).forEach(([key, model]) => {
    models[key] = model(sequelize, Sequelize);
  });
  Object.values(models).forEach(model => {
    if (model.associate) model.associate(sequelize.models);
  });
};

export default configure;
