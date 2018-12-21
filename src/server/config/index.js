import PushNotifications from 'node-pushnotifications';
import graphql from '../graphql';
import database from '../database';
import api from '../api';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const fromEmail = process.env.DEFAULT_FROM_EMAIL;

const mailTo = process.env.MAIL_TO;

const dbPromise = database();

const settings = {
  // gcm: {
  //     id: null,
  //     phonegap: false, // phonegap compatibility mode, see below (defaults to false)
  //     ...
  // },
  // apn: {
  //     token: {
  //         key: './certs/key.p8', // optionally: fs.readFileSync('./certs/key.p8')
  //         keyId: 'ABCD',
  //         teamId: 'EFGH',
  //     },
  //     production: false // true for APN production environment, false for APN sandbox environment,
  //     ...
  // },
  // adm: {
  //     client_id: null,
  //     client_secret: null,
  //     ...
  // },
  // wns: {
  //     client_id: null,
  //     client_secret: null,
  //     notificationMethod: 'sendTileSquareBlock',
  //     ...
  // },
  web: {
    vapidDetails: {
      subject: `mailto:${mailTo}`,
      publicKey: process.env.VAPID_PUBLIC_KEY,
      privateKey: process.env.VAPID_PRIVATE_KEY
    },
    gcmAPIKey: process.env.GOOGLE_CLOUD_MESSAGING_API_KEY,
    TTL: 2419200,
    contentEncoding: 'aes128gcm',
    headers: {}
  },
  isAlwaysUseFCM: false // true all messages will be sent through node-gcm (which actually uses FCM)
};

const push = new PushNotifications(settings);

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const config = app => {
  app.use(async (req, res, next) => {
    req.db = await dbPromise;
    next();
  });
  app.use((req, res, next) =>
    session({
      secret: process.env.SESSION_SECRET,
      name: 'sessionId',
      resave: false,
      store: new SequelizeStore({
        db: req.db
      })
    })(req, res, next)
  );
  app.use(async (req, res, next) => {
    let userId;
    if (req.session && req.session.userId) userId = req.session.userId;
    if (userId)
      req.user = await req.db.models.user.findOne({ where: { id: userId } });
    req.sendEmail = message =>
      sgMail.send({
        from: fromEmail,
        ...message
      });
    req.sendEmails = message =>
      sgMail.sendMultiple({
        from: fromEmail,
        ...message
      });
    req.sendPush = (...args) => push.send(...args);
    req.logout = () =>
      new Promise((resolve, reject) => {
        req.session.userId = undefined;
        req.session.save(err => {
          if (err) reject(err);
          resolve();
        });
      });
    req.login = userId =>
      new Promise((resolve, reject) => {
        req.session.userId = userId;
        req.session.save(err => {
          if (err) reject(err);
          resolve();
        });
      });
    next();
  });

  graphql(app);

  app.use('/api', api);
  return app;
};

export default config;
