const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index.js', './src/tailwind.css'],
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
              limit: 1020,
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
              generator: (content) => svgToMiniDataURI(content.toString()),
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
          ExtractTextPlugin,
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
    new ExtractTextPlugin('tailwind.css', {
      disable: process.env.NODE_ENV === 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};
