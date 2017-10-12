const webpack = require('webpack')

module.exports = {
  entry: './example/demo.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: 'example/demo-bundle.js'
  }
}
