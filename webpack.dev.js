const merge = require('webpack-merge');
const common = require('./webpack.config');

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: ['file-loader'],
      },
    ],
  },
});
