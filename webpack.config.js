const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  let production = argv.mode === "production";

  return {
    entry: {
      "js/admin": path.resolve(__dirname, "app/admin.js")
    },

    output: {
      filename: "rx-insta-feed-admin.js",
      path: path.resolve(__dirname, "admin/js")
    },

    devtool: production ? "" : "source-map",

    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    }
  };
};
