var webpack = require('webpack');

module.exports = {
  entry: {
    index: './index.js'
  },
  output: {
    path: __dirname,
    filename: '[name]_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules\/webpack-dev-server/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    inline: true, //可以监控js变化
    port: 9090,
    hot: true
  }
};