const webpack = require('webpack')

module.exports = {
  entry: './demo/demo.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: './demo/demo-built.js'
  }
}
