const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const extractCSS = ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true
            }
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
          path.resolve(__dirname, 'src/index.jsx')],
  },
  module: {
    loaders: [
      { test: /\.css$/, use: extractCSS },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
  ]
});
