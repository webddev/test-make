import { resolve, join } from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { readdirSync } from 'fs';

const isDev = process.env.NODE_ENV !== 'production';

const DIRNAME = resolve();
const PAGES_DIR = resolve(DIRNAME, './src/');
const PAGES = readdirSync(`${PAGES_DIR}`).filter((fileName) => fileName.endsWith('.html'));

const config = {
  mode: isDev ? 'development' : 'production',

  devtool: isDev ? 'source-map' : false,

  entry: {
    main: [
      resolve(DIRNAME, './src/index.js'),
    ],
  },

  output: {
    filename: '[name].[contenthash].bundle.js',
    path: resolve(DIRNAME, './dist/'),
    assetModuleFilename: 'assets/[name][ext][query]',
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/resource',
        exclude: /img/,
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg|webp|mp4)$/i,
        type: 'asset/resource',
        exclude: /fonts/,
        generator: { filename: 'assets/[name][ext]' },
      },
      {
        test: /\.(html)$/i,
        use: ['html-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  'postcss-preset-env': { browsers: 'last 4 versions' },
                },
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.htaccess|robots.txt|.php/,
        type: 'asset/resource',
        generator: { filename: '[name][ext]' },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    chunkIds: isDev ? 'named' : 'total-size',
    minimize: !isDev,
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 75,
              },
              webp: {
                quality: 75,
              },
            },
          },
        },
      }),
    ].concat(isDev ? [] : [new TerserPlugin()]),
  },

  devServer: {
    historyApiFallback: true,
    static: {
      directory: join(DIRNAME, './dist/assets'),
    },
    open: true,
    compress: true,
    port: 9000,
    watchFiles: ['src/*.html'],
  },

  plugins: [
    ...PAGES.map((page) => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page}`,
      inject: true,
    })),
  ].concat(isDev ? [] : [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].min.css',
      chunkFilename: '[name].[contenthash].min.css',
    }),
  ]),
};

export default config;
