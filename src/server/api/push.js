import PushNotifications from 'node-pushnotifications';
import { Router } from 'express';

const mailTo = process.env.MAIL_TO;

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

const app = Router();

app.post('/', async (req, res) => {
  // TODO: Require Authenticated ADMINS to be able to do this
  const results = await push.send(req.app.get('subscriptionList'), req.body);

  results
    .find(result => {
      return result.method === 'webPush';
    })
    .message.forEach(message => {
      console.log(message);
    });
  res.json({ status: 'GOOOOOOOOOOD!!' });
});
app.delete('/', (req, res) => {});

export default app;
