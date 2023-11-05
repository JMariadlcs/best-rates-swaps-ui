module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
        },
      ],
    },
    devtool: 'source-map',
    ignoreWarnings: [/Failed to parse source map/],
  };