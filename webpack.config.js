const webpack = require('webpack')

module.exports = {
  entry: './docs/index.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: './docs/index-built.js'
  }
}
