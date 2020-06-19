/* eslint-disable */
const merge = require('webpack-merge');
const common = require('./webpack.config');
const TerserJsPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/* eslint-enable */

const path = require('path');

module.exports = merge(common, {
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        parallel: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
});
