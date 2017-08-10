const webpack = require('webpack');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

var CopyWebpackPlugin = require('copy-webpack-plugin');

const build_dir = path.resolve(__dirname, 'build/public_html');
const app_dir = path.resolve(__dirname, 'src/client/app');

var config = {
  // devtool: "source-map",
  entry: {
    index: app_dir + '/index.jsx',
    // app1: app_dir + '/subapps/app1.js'
  },
  
  plugins: [
    new CopyWebpackPlugin([
      {from:'src/server/CodeIgniter3.1.5/application',to:'../application'},
      {from:'src/server/CodeIgniter3.1.5/index.php'},
      {from:'src/server/CodeIgniter3.1.5/.htaccess'},

      {from:'src/client/app/assets',to:'assets'},

      //{from:'src/server/CodeIgniter3.1.5/system',to:'../system'} 

    ]),
    /*new webpack.optimize.CommonsChunkPlugin({
       name: 'main' // Specify the common bundle's name.
    }),*/
    // new HtmlWebpackPlugin(),
    /*
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({minimize: true})*/
  ],
  output: {
    filename: 'js/main.js',
    chunkFilename : 'js/chunk.[name].js',
    path: build_dir
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : app_dir,
        loader : ['babel-loader']
      },
      {
        test: /\.css$/,
        loader: 'style-loader'
      }, 
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },

    ],

  }

};

module.exports = config;