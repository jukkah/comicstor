const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = [{
  target: 'web',
  entry: {
    'client': './src/front-end/client.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist', 'public'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  devtool: 'source-map'
}, {
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  entry: {
    'server': './src/server/index.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  externals: [nodeExternals()],
  plugins: [
    new webpack.IgnorePlugin(/\.css$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  devtool: 'source-map',
}]
