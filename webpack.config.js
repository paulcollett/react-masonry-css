const webpack = require('webpack')

module.exports = {
  entry: './example/example.js',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  output: {
    filename: 'example/example-bundled.js'
  }
}
