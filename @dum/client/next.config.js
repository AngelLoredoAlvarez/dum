const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")([
  "react-native-web",
  "native-base",
]);
const withImages = require("next-images");
const withFonts = require("next-fonts");

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // Ensures no server modules are included on the client.
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /lib\/server/,
        })
      );
    }

    return config;
  },
};

module.exports = withPlugins(
  [withTM, withImages, withFonts, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);
