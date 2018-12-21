const webpush = require('web-push');

const { publicKey, privateKey } = webpush.generateVAPIDKeys();
console.log('PUBLIC KEY: ', publicKey);
console.log('PRIVATE KEY: ', privateKey);
