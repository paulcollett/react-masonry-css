const webpack = require('webpack')

module.exports = {
  entry: './demo/demo.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader', options: { // also inherits .babelrc options
            presets: ['env', 'react'],
            "plugins": ["transform-object-assign", "transform-object-rest-spread"]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: './demo/demo-built.js'
  }
}
