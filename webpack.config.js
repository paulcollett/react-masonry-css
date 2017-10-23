const webpack = require('webpack')

module.exports = {
  entry: './docs/demo.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: './docs/demo-built.js'
  }
}
