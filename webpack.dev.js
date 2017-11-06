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

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, 'src/index.jsx')
  },
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
