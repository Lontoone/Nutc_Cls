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
    },
    webpackFinal: (config) => {
      config.node = { fs: "empty" };
      return config;
    },
  };
  