const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader"
          }
        });

module.exports = merge(common, {
  module: {
    loaders: [
      { test: /\.css$/, use: extractCSS },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" }
    ]
  },
  devtool: "eval-cheap-module-source-map",
  devServer: {
    contentBase: './dist'
  },
});
