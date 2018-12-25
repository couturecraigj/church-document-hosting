require('babel-register');
require('babel-polyfill');

require('dotenv').config();

(async () => {
  const { build } = require('../src/server/database/index');
  try {
    await build();
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
})();
