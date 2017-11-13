const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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

module.exports = merge(common, {
  entry: {
    main: path.resolve(__dirname, 'src/index.jsx'),
    vendor: ['react', 'material-ui', 'mqtt', 'lodash']
  },
  module: {
    loaders: [
      { test: /\.css$/, use: extractCSS },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
  ]
});
