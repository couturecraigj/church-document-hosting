const fs = require("fs");
const sharp = require("sharp");
const pngToIco = require("png-to-ico");

const createIconOfSize = size =>
  sharp("public/icon.png")
    .resize(size)
    .toFile(`public/images/icons-${size}.png`);

const createFavicon = () =>
  new Promise((resolve, reject) => {
    pngToIco("public/icon.png")
      .then(buf => {
        fs.writeFileSync("public/favicon.ico", buf);
        resolve();
      })
      .catch(reject);
  });
(async () => {
  await createIconOfSize(114);
  await createIconOfSize(144);
  await createIconOfSize(192);
  await createIconOfSize(512);
  await createFavicon();
})();
