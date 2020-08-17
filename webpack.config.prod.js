const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  mode: 'production',
  entry: {
    main: ['react-hot-loader/patch', './src/index.js'],
    vendor: ['react', 'react-dom', 'prop-types', 'redux', 'react-redux'],
  },
  output: {
    filename: '[name].[chunkhash:12].js',
    chunkFilename: '[name].[chunkhash:12].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  performance: {
    hints: false,
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
        },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /node_modules/,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${htmlWebpackPlugin.options.title}</title>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
      `,
      title: 'React starter pack',
    }),
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/resources', to: 'resources' }],
    }),
  ],
};
