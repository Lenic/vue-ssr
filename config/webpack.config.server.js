import fs from 'fs';
import path from 'path';
import _ from 'underscore';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

function resolve(...args) {
  if (args.length > 1) {
    return path.resolve(...args);
  } else if (args.length === 1) {
    return path.resolve(__dirname, args[0]);
  } else {
    return '';
  }
}

export default {
  entry: {
    server: resolve('../src')
  },
  output: {
    filename: '[name].js',
    path: resolve('../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.attached.less', '.global.less', '.less'],
    // alias: {
    //   '$res': resolve('../src/res'),
    //   '$lib': resolve('../src/lib'),
    // },
  },
  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'index.template.html',
      template: resolve('../src/index.template.html'),
    }),
  ]
}
