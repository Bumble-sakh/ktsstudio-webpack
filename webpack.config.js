const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const sourcePath = path.resolve(__dirname, 'src');

const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
  return [
    MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
  entry: path.resolve(sourcePath, 'index.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  target: isProd ? 'browserslist' : 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      components: path.join(sourcePath, 'components'),
      config: path.join(sourcePath, 'config'),
      styles: path.join(sourcePath, 'styles'),
      utils: path.join(sourcePath, 'utils'),
      models: path.join(sourcePath, 'models'),
    },
  },
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(sourcePath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
  ].filter(Boolean),
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
};
