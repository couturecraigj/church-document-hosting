const path = require("path");
const isHeroku = require("is-heroku");
const modifyBuilder = require("razzle-plugin-pwa").default;

const pwaConfig = {
  swDest: "/sw.js",
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: new RegExp("https://www.mysite.co"),
      handler: "networkFirst"
    }
  ]
};

const manifestConfig = {
  filename: "/manifest.json",
  name: "Razzle App",
  short_name: "Razzle",
  description: "Another Razzle App",
  orientation: "portrait",
  display: "fullscreen",
  start_url: ".",
  theme_color: "#ffffff",
  background_color: "#ffffff",
  related_applications: [],
  icons: [
    {
      src: require.resolve(path.join(__dirname, "public", "images", "icons-192.png")),
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: require.resolve(path.join(__dirname, "public", "images", "icons-512.png")),
      sizes: "512x512",
      type: "image/png"
    }
  ]
};

const modify = modifyBuilder({ pwaConfig, manifestConfig });

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    if (target !== "node") return config;

    const isDefinePlugin = plugin => plugin.constructor.name === "DefinePlugin";
    const indexDefinePlugin = config.plugins.findIndex(isDefinePlugin);

    if (indexDefinePlugin < 0) {
      console.warn("Couldn't setup razzle-heroku, no DefinePlugin...");
      return config;
    }

    const { definitions } = config.plugins[indexDefinePlugin];
    const newDefs = Object.assign({}, definitions);

    if (isHeroku) {
      delete newDefs["process.env.PORT"];
      newDefs["process.env.RAZZLE_PUBLIC_DIR"] = '"/app/build/public"';
    }

    config.plugins[indexDefinePlugin] = new webpack.DefinePlugin(newDefs);

    return config;
  }
  // plugins: [{ func: modify }]
};
