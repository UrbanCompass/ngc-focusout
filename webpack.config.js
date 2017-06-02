/* eslint-env node */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ngc-focusout.js',
    library: 'ngc-focusout',
    libraryTarget: 'umd',
  },
  externals: ['angular'],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ],
  },
};
