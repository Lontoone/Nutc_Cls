const webpack = require("webpack");
module.exports = {
  webpack: {
    configure: {
      // See https://github.com/webpack/webpack/issues/6725
      module: {
        rules: [
          {
            test: /\.wasm$/,
            type: "javascript/auto",
          },
        ],
      },
    },
    plugins: {
      add: [
        new webpack.DefinePlugin({
          process: { env: {} },
        }),
        new webpack.BannerPlugin("做好玩的 by Lontoone"),
      ],
    },
  },
  webpackFinal: (config) => {
    config.node = { fs: "empty" };
    return config;
  },
  kit: {
    floc: true,
  },
};
