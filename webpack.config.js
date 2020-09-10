// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BABEL_ENV: JSON.stringify(process.env.BABEL_ENV),
        WIDGET_ENV: JSON.stringify(process.env.WIDGET_ENV)
      }
    })
  ],
  watch: true
};
