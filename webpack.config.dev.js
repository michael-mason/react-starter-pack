const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
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
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
    contentBase: path.join(__dirname, 'src'),
  },
};
