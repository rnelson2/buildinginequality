const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const appDir = path.resolve(__dirname, "public");

module.exports = merge(
  {
    devtool: "inline-source-map",
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    output: {
      path: appDir,
      filename: "index.js",
      publicPath: "/",
      //chunkFilename: 'chunk-[name].[contenthash].js'
    },
    devServer: {
      static: appDir,
      historyApiFallback: true,
      port: 9000,
    },
    plugins: [
      new webpack.DefinePlugin({
        //'process.env.NODE_ENV': JSON.stringify('production')
        "process.env.PUBLIC_URL": JSON.stringify(""),
      }),
      new HtmlWebpackPlugin({
        templateContent: '<html> <head> <title>Building Inequality</title> <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0" /> <link href="https://fonts.googleapis.com" rel="preconnect" /> <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=EB+Garamond|Special+Elite|News+Cycle|Merriweather:300|Krona+One:400|Lato:400,100,300,700|Lora:100,400|Crimson+Text:400i|PT+Sans:400&display=swap" /> <link rel="apple-touch-icon" sizes="180x180" href="/static/icos/directory/favicon/apple-touch-icon.png" /> <link rel="icon" type="image/png" sizes="32x32" href="/static/icos/directory/favicon/favicon-32x32.png" > <link rel="icon" type="image/png" sizes="16x16" href="/static/icos/directory/favicon/favicon-16x16.png" />  <link rel="mask-icon" href="/static/icos/directory/favicon/safari-pinned-tab.svg" color="#5bbad5" /> <meta name="msapplication-TileColor" content="#da532c" /> <meta name="theme-color" content="#ffffff" /> </head> <body> <div id="app-container" /> </body> </html>', }),
      // new ExtractTextPlugin({
      //   filename: '[name].[contenthash].css',
      //   disable: process.env.NODE_ENV === 'development'
      // })
    ],
  },
  common
);
