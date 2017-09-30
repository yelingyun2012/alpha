const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

let pages = utils.getEntry(config.common.entranceHtml)
let plugin = [
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.DefinePlugin({
    'process.env': config.dev.env
  }),
  // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new FriendlyErrorsPlugin(),
  // split vendor js into its own file
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor'
  }),
  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: ['vendor']
  })
]
Object.keys(pages).forEach(pagesName => {
  let fileName, Template
  if (pagesName === 'index') {
    fileName = `./${pagesName}.html`,
      Template = `${config.common.pluginOutput}/${pagesName}/${pagesName}.${config.common.fileType}`
  } else {
    fileName = `./view/${pagesName}.html`,
      Template = `${config.common.pluginOutput}/${pagesName}/${pagesName}.${config.common.fileType}`
  }
  let conf = {
    filename: fileName,
    template: Template,
    inject: true,
    chunks: ['manifest', 'vendor', pagesName],
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
    },
    chunksSortMode: 'dependency'
  }
  plugin.push(
    new HtmlWebpackPlugin(conf)
  )
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: plugin
})
