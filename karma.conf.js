/* eslint-env node */
const path = require('path');

module.exports = function (config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js', // only needed because of PhantomJS
      'tests/**/*.js',
    ],

    exclude: [],

    preprocessors: {
      './tests/**/*.js': ['webpack'],
    },

    webpack: {
      module: {
        rules: [
          {
            loader: 'babel-loader',
            test: /\.js$/,
            include: [
              path.resolve(__dirname, 'src'),
              path.resolve(__dirname, 'tests'),
            ],
            exclude: [
              path.resolve(__dirname, 'node_modules'),
            ],
          },
        ],
      },
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity,
  });
};
