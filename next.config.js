const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const nextBuildId = require("next-build-id");
module.exports = withPlugins([
  [
    optimizedImages,
    {
      handleImages: ["jpeg", "png"],
      /* config for next-optimized-images */
    },
  ],
  {
    env: {
      API_URL: process.env.API_URL,
      API_TRAINING_HUB_URL: process.env.API_TRAINING_HUB_URL,
      APP_URL: process.env.APP_URL,
      LOQATE_KEY: process.env.LOQATE_KEY,
      STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
      GOOGLE_KEY: process.env.GOOGLE_KEY,
      GUARD_PASS_URL: process.env.GUARD_PASS_URL,
      SEJDA_TOKEN: process.env.SEJDA_TOKEN,
      WEB_JOB_BOARD_URL: process.env.WEB_JOB_BOARD_URL,
      SOCKET_API: process.env.SOCKET_API,
      COMPANY_DIR_URL: process.env.COMPANY_DIR_URL,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
      APP_BUILD_ID: Math.random() * (500000 - 500) + 500,
    },
    // assetPrefix: "https://www.guardpass.com/employers/",
    // basePath: "/employers",
    generateBuildId: () => nextBuildId({ dir: __dirname, describe: true }),
  },
  {
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      // Important: return the modified config
      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups.shared = {
          name: "app-other", // this needs to be a value that is different from what the other chunks in your app are using
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        };
      }
      return config;
    },
  },
  // your other plugins here
]);
