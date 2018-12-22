import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';

const resetPasswordTemplate = process.env.RESET_PASSWORD_TEMPLATE_ID;

const dev = process.env.NODE_ENV !== 'production';

const tokenExpiryAddition = 1000 * 60 * 60 * 24;

const user = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userName: {
      type: Sequelize.STRING,
      unique: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING(500)
    },
    resetToken: {
      type: Sequelize.STRING(500)
    },
    resetExpiry: {
      type: Sequelize.DATE
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  User.beforeCreate(async user => {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (error) {
      console.error(error);
    }
  });
  User.logOut = async function(args, context) {
    await context.req.logout();

    return 'SUCCESS!';
  };
  User.logIn = async function(args, context) {
    const email = await sequelize.models.email.findOne({
      where: { address: args.userName }
    });
    const user = await User.findOne({
      where: {
        [Sequelize.Op.or]: [
          email && { emailId: email.id },
          { userName: args.userName }
        ]
      }
    });
    if (!user) throw new Error('Username or Password does not match a user');
    const match = await bcrypt.compare(args.password, user.password);
    if (!match) throw new Error('Username or Password does not match a user');
    await context.req.login(user.id);
    return user;
  };

  User.signUp = async function(args, context) {
    const email = await sequelize.models.email
      .findOrCreate({
        where: { address: args.email }
      })
      .spread((user, created) => user);

    let user = await User.findOne({
      where: {
        emailId: email.id
      }
    });
    if (user) throw new Error('User already exists!');
    user = await User.create({ ...args, emailId: email.id });
    await context.req.login(user.id);
    return user;
  };

  User.forgotPassword = async function(args, context) {
    const email = await sequelize.models.email.findOne({
      where: { address: args.email }
    });
    if (!email) throw new Error('Email is not Registered');
    const user = await User.findOne({ where: { emailId: email.id } });
    user.resetToken = Buffer.from(await bcrypt.hash(uuid(), 10)).toString(
      'base64'
    );
    user.resetExpiry = new Date(Date.now() + tokenExpiryAddition);
    await user.save();
    if (dev) return user.resetToken;
    const message = {
      to: args.email,
      subject: 'Hello world',
      text: 'Hello plain world!',
      html: '<p>Hello HTML world!</p>',
      templateId: resetPasswordTemplate,
      dynamic_template_data: {
        firstName: user.firstName,
        token: user.resetToken
      }
    };
    await context.req.sendEmail(message);
    return `You should receive an email at ${
      args.email
    } with a link to reset your password`;
  };

  User.resetPassword = async function(args, context) {
    const user = await User.findOne({
      where: {
        resetToken: args.token,
        resetExpiry: { [Sequelize.Op.gte]: new Date() }
      }
    });
    if (!user) throw new Error('NO User Found');
    user.password = args.password;
    user.resetToken = '';
    user.resetExpiry = null;
    await user.save();
    await context.req.login(user.id);
    return user;
  };

  User.associate = models => {
    User.belongsTo(models.email, {
      unique: true,
      allowNull: false
    });
  };

  return User;
};

export default user;
