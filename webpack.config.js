const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = 'commonjs ' + mod);

const serverConfig = {
  target: 'node',
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.css$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  devtool: 'sourcemap',
}

const clientConfig = {}

module.exports = [serverConfig, /* clientConfig */]
