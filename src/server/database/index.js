import Sequelize from 'sequelize';
import models from './models';

let sequelize;
const dev = process.env.NODE_ENV !== 'production';
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminFirstName = process.env.ADMIN_FIRST_NAME;
const adminLastName = process.env.ADMIN_LAST_NAME;
if (dev) {
  sequelize = new Sequelize('ChMS', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    // operatorsAliases: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }

    // SQLite only
    // storage: 'path/to/database.sqlite'
  });
} else {
  // Or you can simply use a connection uri
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DATABASE_DIALECT,
    logging: !dev
  });
}

// sequelize = new Sequelize('ChMS', 'postgres', 'admin', {
//   host: 'localhost',
//   dialect: 'postgres',
//   // operatorsAliases: false,

//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }

//   // SQLite only
//   // storage: 'path/to/database.sqlite'
// });

const start = async () => {
  if (!sequelize.started) {
    sequelize.started = true;
    await sequelize
      .authenticate()
      .then(async () => {
        await models(sequelize, Sequelize);
        await sequelize.sync({ force: true });
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
    const email = await sequelize.models.email
      .findOrCreate({
        where: { address: adminEmail }
      })
      .spread(email => email);
    try {
      await sequelize.models.user
        .findOrCreate({
          where: {
            emailId: email.id,
            userName: adminEmail,
            firstName: adminFirstName,
            lastName: adminLastName,
            password: adminPassword
          }
        })
        .spread(user => user);
      let date = Date.now();
      await sequelize.models.doc.create({
        title: 'Prayer Guide',
        content: '<div><h1>YOU DID IT</h1></div>',
        date: new Date(date)
      });
      await sequelize.models.doc.create({
        title: 'Bulletin',
        content: '<div><h1>YOU DID IT</h1></div>',
        date: new Date(date)
      });

      date = new Date(date - 10000000000).getTime();

      await sequelize.models.doc.create({
        title: 'Prayer Guide',
        content: '<div><h1>YOU DID IT</h1></div>',
        date: new Date(date)
      });
      await sequelize.models.doc.create({
        title: 'Bulletin',
        content: '<div><h1>YOU DID IT</h1></div>',
        date: new Date(date)
      });
    } catch (error) {}
  }
  return sequelize;
};

export default start;
