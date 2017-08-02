const webpack = require('webpack');
const path = require('path');
// const HTMLWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build/public_html');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  // devtool: "source-map",
  entry: {
    index: APP_DIR + '/index.jsx',
    // app1: APP_DIR + '/subapps/app1.js'
  },
  plugins: [
    /*new webpack.optimize.CommonsChunkPlugin({
       name: 'index' // Specify the common bundle's name.
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})*/
  ],
  output: {
    filename: '[name].bundle.js',
    path: BUILD_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : ['babel-loader']
      }
    ],

  }

};

module.exports = config;