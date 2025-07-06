const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const appDir = path.resolve(__dirname, 'build');

const public_url = '/';

module.exports = merge({
  devtool: false,
  output: {
    path: appDir,
    filename: 'index.js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [(compiler) => {
      const TerserPlugin = require('terser-webpack-plugin');
      new TerserPlugin({
        terserOptions: {
          compress: {},
        }
      }).apply(compiler);
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      //'process.env.NODE_ENV': JSON.stringify('production')
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify(public_url),
      }
    }),
    new HtmlWebpackPlugin({
      templateContent: '<html> <head> <title>Building Inequality</title> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" /> <link href="https://fonts.googleapis.com" rel="preconnect" /> <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB+Garamond|Special+Elite|News+Cycle|Merriweather:300|Krona+One:400|Lato:400,100,300,700|Lora:100,400|Crimson+Text:400i|PT+Sans:400&display=swap" /> <meta name="msapplication-TileColor" content="#da532c" /> <meta name="theme-color" content="#ffffff" /> </head> <body> <div id="app-container" /> </body> </html>',
    }),
    new CopyWebpackPlugin({
      patterns: [ { from: 'public', to: './' } ]
    }),
    new CompressionPlugin()
  ]
}, common);
