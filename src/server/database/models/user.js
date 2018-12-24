import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';

const resetPasswordTemplate = process.env.RESET_PASSWORD_TEMPLATE_ID;

const dev = process.env.NODE_ENV !== 'production';

const tokenExpiryAddition = 1000 * 60 * 60 * 24;

const user = (sequelize, Sequelize = require('sequelize')) => {
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
      if (!user.password) return;
      if (!user.changed('password')) return;
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

  User.mergeUsers = async function(args, context) {
    const users = await User.findAll({
      where: { id: { [Sequelize.Op.in]: args.ids } }
    });
    let masterUser = users.find(user => user.id === args.master);
    await User.associations.Emails.update(
      {
        userId: masterUser.id
      },
      {
        where: { userId: { [Sequelize.Op.in]: args.ids } }
      }
    );
    await User.associations.Phones.update(
      {
        userId: masterUser.id
      },
      {
        where: { userId: { [Sequelize.Op.in]: args.ids } }
      }
    );
    const phones = [
      ...users
        .filter(user => user.phoneId && user.id !== masterUser.id)
        .map(user => user.phoneId)
    ];
    const emails = [
      ...users
        .filter(user => user.emailId && user.id !== masterUser.id)
        .map(user => user.emailId)
    ];
    for (const emailId of emails) {
      await User.associations.Emails.findOrCreate({
        where: {
          userId: masterUser.id,
          emailId
        }
      });
    }
    for (const phoneId of phones) {
      await User.associations.Phones.findOrCreate({
        where: {
          userId: masterUser.id,
          phoneId
        }
      });
    }

    users.forEach(user => {
      masterUser = {
        ...user,
        ...masterUser
      };
    });

    return;
  };

  User.createUser = async function(args, context) {
    if (!args.email && !args.phone)
      throw new Error('All users have to have either a phone or an email');
    if (!dev && (!context.req.user || !context.req.user.admin))
      throw new Error('You are not an admin so you cannot perform this action');
    const email = await (args.email
      ? sequelize.models.email
          .findOrCreate({
            where: { address: args.email }
          })
          .spread((email, created) => {
            if (!created)
              throw new Error('User with that email already exists');
            return email;
          })
      : Promise.resolve({}));

    const phone = await (args.phone
      ? sequelize.models.phone
          .findOrCreate({
            where: { number: args.phone }
          })
          .spread((phone, created) => {
            if (!created)
              throw new Error('User with that phone already exists');
            return phone;
          })
      : Promise.resolve({ id: undefined }));
    return User.create({
      ...args,
      emailId: email.id,
      phoneId: phone.id
    });
  };

  User.signUp = async function(args, context) {
    const email = await sequelize.models.email
      .findOrCreate({
        where: { address: args.email }
      })
      .spread((user, created) => {
        if (!created) throw new Error('Email already existed');
        return user;
      });

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
  User.associations = {};
  User.associate = models => {
    User.associations.Email = User.belongsTo(models.email, {
      unique: true
    });
    User.associations.Phone = User.belongsTo(models.phone, {
      unique: true
    });
    User.associations.Emails = User.belongsToMany(models.email, {
      through: 'userEmails'
    });
    User.associations.Phones = User.belongsToMany(models.phone, {
      through: 'userPhones'
    });
    User.associations.Image = User.belongsTo(models.image);
  };

  return User;
};

export default user;
