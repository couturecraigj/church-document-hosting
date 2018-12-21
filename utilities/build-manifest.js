require('dotenv').config();
const fs = require('fs');

(async () => {
  const files = fs.readdirSync('public/images');
  const manifest = {
    short_name: process.env.APP_SHORT_NAME,
    name: process.env.APP_LONG_NAME,
    icons: files.map(file => ({
      src: `/images/${file}`,
      type: 'image/png',
      sizes: `${file.replace(/icons-(\d+).png/gm, '$1')}x${file.replace(
        /icons-(\d+).png/gm,
        '$1'
      )}`
    })),
    gcm_sender_id: process.env.GOOGLE_PROJECT_ID,
    start_url: '/',
    background_color: process.env.APP_BACKGROUND_COLOR,
    display: 'standalone',
    scope: '/',
    theme_color: process.env.APP_THEME_COLOR
  };
  fs.writeFileSync('public/manifest.json', JSON.stringify(manifest, null, 1));
})();
