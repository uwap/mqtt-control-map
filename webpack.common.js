const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const preBuildScripts = process.env.NO_FLOW == undefined ?
  process.env.FLOW_PATH != undefined ? [process.env.FLOW_PATH] : ['flow']
  : [];

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [
      { test: /\.(woff2?|eot|ttf|svg)$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    // new WebpackShellPlugin({onBuildStart:preBuildScripts}),
    new HtmlWebpackPlugin({
      title: 'Space Map',
      template: 'index.ejs'
    }),
    new ExtractTextPlugin("styles.css")
  ]
};
