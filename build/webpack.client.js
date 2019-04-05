const commonConfig = require('./webpack.base')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const version = process.env.VERSION || require('../package.json').version

const banner =
  '/*!\n' +
  ` * sider-bar-scroll.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} Shibin You\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const isDev = process.env.NODE_ENV !== 'production'
var config
if (isDev) {
  config = merge(commonConfig, {
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      host: '0.0.0.0',
      port: 8080
    }
  })
} else {
  config = merge(commonConfig, {
    mode: 'production',
    plugins:[new webpack.BannerPlugin({
      banner: banner
    })]
  })
}
module.exports = config
