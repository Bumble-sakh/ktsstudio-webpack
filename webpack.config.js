const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const sourcePath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

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
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ];
};

module.exports = {
  entry: path.resolve(sourcePath, 'index.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle[hash].js',
  },
  target: isProd ? 'browserslist' : 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@components': path.join(sourcePath, 'components'),
      '@pages': path.join(sourcePath, 'pages'),
      '@config': path.join(sourcePath, 'config'),
      '@styles': path.join(sourcePath, 'styles'),
      '@utils': path.join(sourcePath, 'utils'),
      '@assets': path.join(sourcePath, 'assets'),
      '@store': path.join(sourcePath, 'store'),
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
        exclude: /node_modules/,
        loader: 'babel-loader',
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
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      filename: './index.html',
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
    }),
    new TsCheckerPlugin(),
    new InterpolateHtmlPlugin({
      PUBLIC_URL: '.',
    }),
  ].filter(Boolean),
  devServer: {
    host: '127.0.0.1',
    port: 9000,
    hot: true,
    historyApiFallback: true,
    open: true,
  },
};
