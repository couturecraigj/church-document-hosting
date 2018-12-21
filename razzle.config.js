const path = require('path');
const fs = require('fs');
const isHeroku = require('is-heroku');
const modifyBuilder = require('razzle-plugin-pwa').default;

const getFileHash = path => {
  var crypto = require('crypto');

  // change to 'md5' if you want an MD5 hash
  var hash = crypto.createHash('md5');

  // change to 'binary' if you want a binary hash.
  hash.setEncoding('hex');

  // the text that you want to hash
  hash.write(fs.readFileSync(path, { encoding: 'utf8' }));

  // very important! You cannot read from the stream until you have called end()
  hash.end();

  // and now you get the resulting hash
  return hash.read();
};

const pwaConfig = {
  swDest: '/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp('https://www.mysite.co'),
      handler: 'networkFirst'
    }
  ]
};

const manifestConfig = {
  filename: '/manifest.json',
  name: 'Razzle App',
  short_name: 'Razzle',
  description: 'Another Razzle App',
  orientation: 'portrait',
  display: 'fullscreen',
  start_url: '.',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  related_applications: [],
  icons: [
    {
      src: require.resolve(
        path.join(__dirname, 'public', 'images', 'icons-192.png')
      ),
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: require.resolve(
        path.join(__dirname, 'public', 'images', 'icons-512.png')
      ),
      sizes: '512x512',
      type: 'image/png'
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config.module.rules[1].test = /\.(js|jsx)$/;
    const isDefinePlugin = plugin => plugin.constructor.name === 'DefinePlugin';
    const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin);
    const { definitions } = config.plugins[indexDefinePlugin];
    const newDefs = Object.assign({}, definitions);
    const faviconHash = getFileHash('public/favicon.ico');
    console.log(faviconHash);
    if (indexDefinePlugin < 0) {
      console.warn("Couldn't setup razzle-heroku, no DefinePlugin...");
      return config;
    }

    newDefs['process.env.RAZZLE_FAVICON_HASH'] = JSON.stringify(faviconHash);
    newDefs['process.env.RAZZLE_GCM_API_KEY'] = JSON.stringify(
      process.env.VAPID_PUBLIC_KEY
    );

    if (target === 'node') {
      if (isHeroku) {
        delete newDefs['process.env.PORT'];
        newDefs['process.env.RAZZLE_PUBLIC_DIR'] = '"/app/build/public"';
      }
    } else {
      const imageList = fs
        .readdirSync('public/images')
        .map(image => `/images/${image}`);
      newDefs['process.env.RAZZLE_IMAGE_LIST'] = JSON.stringify(imageList);
    }

    config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs);

    return config;
  }
  // plugins: [{ func: modify }]
};
