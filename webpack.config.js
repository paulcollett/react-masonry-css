const webpack = require('webpack')

module.exports = {
  entry: './demo/demo.js',
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: 'demo/demo-bundle.js'
  }
}
