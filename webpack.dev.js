const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader"
          }
        });

const configPath = env => {
  if (env === true) {
    throw "No config file was provided.";
  }
  return path.resolve(__dirname, `config/${env}`);
};

module.exports = env => merge(common, {
  entry: {
    main: [configPath(env),
          path.resolve(__dirname, 'src/index.jsx')]
  },
  module: {
    rules: [
      { test: /\.css$/, use: extractCSS },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: './dist'
  },
});
