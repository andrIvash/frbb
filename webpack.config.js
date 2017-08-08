const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


const config = {
  context: path.join(__dirname, '/src'),
  entry: {
    app: ['./js/app.js', './js/getData.js']
  },
  output: {
    filename: 'assets/scripts/[name].bundle.js',
    path: path.join(__dirname, '/dist')
  },
  devServer: {
    contentBase: path.join(__dirname, '/src'),
    stats: 'errors-only',
    proxy: {
      '/server': {
        target: 'http://localhost:3000',
        secure: false,
        pathRewrite: {'^/server' : ''}
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      chunks: ['app', 'commons'],
      template: './templates/index.pug'
    }),
    new ExtractTextPlugin({
      filename: 'assets/styles/[name].bundle.css',
      disable: true}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'assets/scripts/commons.js',
      minChunks: 2
    }),
    new CleanWebpackPlugin('./build', {watch: true}),
    new StyleLintPlugin({
            configFile: './.stylelintrc',
        }),
    new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
    })     
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader",
        options: {
            fix: true
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            publicPath: '../',
            fallback: 'style-loader',
            use: ['css-loader','sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap=true', 'postcss-loader']
        })
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {test: /\.(svg)$/, use: 'url-loader?limit=65000&mimetype=image/svg+xml&name=images/[name].[ext]'},
      {test: /\.(png)$/, use: 'url-loader?limit=100000&mimetype=image/png&name=images/[name].[ext]'},
      {test: /\.(jpg)$/, use: 'file-loader?name=images/[name].[ext]'},
      {test: /\.(eot|ttf|woff|woff2)$/, use: 'file-loader?name=fonts/[name].[ext]'}
    ]
  }
};

module.exports = function(env) {
    if (env === 'production') {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true 
      }));
      config.plugins.push(new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: {removeAll: true }}
      }));
      config.plugins.push(new FaviconsWebpackPlugin('./favicon.png'));
      config.devtool = 'source-map';
    } 
    return config;
}

