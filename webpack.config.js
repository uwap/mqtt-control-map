const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const preBuildScripts = process.env.NO_FLOW == undefined ?
  process.env.FLOW_PATH != undefined ? [process.env.FLOW_PATH] : ['flow']
  : [];

const configPath = env => {
  const filtered = Object.keys(env).filter((e) => !e.startsWith("WEBPACK"));
  if (filtered.length < 1) {
    throw "No config file was provided.";
  }
  return path.resolve(__dirname, `config/${filtered[0]}`);
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
      'lodash': 'lodash-es',
      "leaflet": "leaflet/dist/leaflet-src.esm.js"
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      // TODO: CSS follow imports and minify + sourcemap on production
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      { test: /\.(woff2?|eot|ttf|svg|png)$/, use: [ { loader: "file-loader", options: { esModule: false } } ] },
      { test: /\.js(x)?$/, use: ["babel-loader?cacheDirectory=true"] }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: preBuildScripts,
        blocking: true,
        parallel: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Space Map',
      template: 'index.ejs'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
  ]
});
