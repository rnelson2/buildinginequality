require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');

const config = {
  entry: ['babel-polyfill', './src/index.js'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'file-loader',
      },
      {
        test: /\.(js|jsx)$/,
        include: SRC_DIR,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000
            },
          },
        ],
      },
    ],
  }
};

module.exports = config;
