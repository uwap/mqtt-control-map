const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const preBuildScripts = process.env.NO_FLOW == undefined ?
  process.env.FLOW_PATH != undefined ? [process.env.FLOW_PATH] : ['flow']
  : [];

const configPath = env => {
  if (env === true) {
    throw "No config file was provided.";
  }
  return path.resolve(__dirname, `config/${env}`);
};

module.exports = env => ({
  entry: {
    main: [configPath(env),
          path.resolve(__dirname, 'src/index.jsx')]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.jsx'],
    alias: {
      'lodash': 'lodash-es'
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      // TODO: CSS follow imports and minify + sourcemap on production
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(woff2?|eot|ttf|svg)$/, loader: "file-loader" },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader?cacheDirectory=true" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new WebpackShellPlugin({onBuildStart:preBuildScripts}),
    new HtmlWebpackPlugin({
      title: 'Space Map',
      template: 'index.ejs'
    }),
  ]
});
