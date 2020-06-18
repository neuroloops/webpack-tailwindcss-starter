const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js', './src/styles.css'],
  },
  output: {
    filename: 'js/[name]-[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(jpg|jp(e*)g|gif|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 102400,
              name: '[name]-[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      }, // end images rule
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
              name: '[name]-[contenthash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      }, // end svg rule
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[contenthash].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      }, // end font rule
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      disable: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};
