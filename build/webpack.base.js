const {
  resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");


const isDev = process.env.NODE_ENV !== 'production'
var filename = `side-bar-scroll.min.js`
if (isDev) {
  filename = `side-bar-scroll.js`
}
module.exports = {
  optimization: {
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  entry: './src/main.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: `js/${filename}`
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader','postcss-loader']
    }, {
      test: /\.(png|jpg|gif|jpeg|webp)$/,
      use: [{
        loader: 'file-loader',
        options: {},
      }, ]
    }]
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  },
  plugins: [new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve('index.html'),
      title: 'side-scroll',
      meta: {
        ' viewport ': 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,initial-scale=1.0,width=device-width',
        'format-detection': 'telephone=no,email=no,date=no,address=no'
      }
    }),
    new MiniCssExtractPlugin({
       filename: "css/[name].css",
       chunkFilename: "[id].css"
     })
  ]
}
