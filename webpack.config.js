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
  externals: 'angular',
};
