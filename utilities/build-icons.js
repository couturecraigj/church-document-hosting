const fs = require('fs');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const imageSizes = [57, 72, 114, 144, 192, 512];

const createIconOfSize = size =>
  sharp('public/icon.png')
    .resize(size)
    .toFile(`public/images/icons-${size}.png`);

const createFavicon = () =>
  new Promise((resolve, reject) => {
    pngToIco('public/icon.png')
      .then(buf => {
        fs.writeFileSync('public/favicon.ico', buf);
        resolve();
      })
      .catch(reject);
  });
(async sizes => {
  for (const size of sizes) {
    await createIconOfSize(size);
  }
  await createFavicon();
})(imageSizes);
