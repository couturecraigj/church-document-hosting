import user from './user';
import subscription from './subscription';
import email from './email';
import session from './session';
import doc from './doc';
import phone from './phone';
import image from './image';

const models = {
  User: user,
  Subscription: subscription,
  Doc: doc,
  Email: email,
  Session: session,
  Phone: phone,
  Image: image
};

/**
 * TODO: Create Permission Sets
 */

const configure = (sequelize, Sequelize) => {
  Object.entries(models).forEach(([key, model]) => {
    models[key] = model(sequelize, Sequelize);
  });
  Object.values(models).forEach(model => {
    if (model.associate) model.associate(sequelize.models);
  });
};

export default configure;
