// webpack.config.js:

const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const preBuildScripts = process.env.NO_FLOW == undefined ?
  process.env.FLOW_PATH != undefined ? [process.env.FLOW_PATH] : ['flow']
  : [];

const extractTextCSSLoader = ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        });

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry:  [
    path.resolve(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: './'
  },
  module: {
    loaders: [
      { test: /\.(woff2?|eot|ttf|svg)$/, loader: "file-loader" },
      { test: /\.css$/, use: extractTextCSSLoader },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new WebpackShellPlugin({onBuildStart:preBuildScripts}),
    new HtmlWebpackPlugin({
      title: 'Space Map',
      template: 'index.ejs'
    }),
    new ExtractTextPlugin("styles.css")
  ],
  devtool: 'source-map'
};
