var path = require('path');

module.exports = [ {
  name: 'server',
  target: 'node',
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'src', 'server', 'server.js'),
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      loader: ['babel-loader']
    } ]
  },
  node: {
    __dirname: false,
    __filename: false,
  }
}, {
  name: 'client',
  entry: path.join(__dirname, 'src', 'client', 'client.jsx'),
  devtool: 'eval-source-map',
  output: {
    filename: 'client.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      loader: ['babel-loader']
    } ]
  }
} ];
