'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = config.build.env

const pages = utils.getEntry(config.common.entranceHtml)
const plugin = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
        'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor'],
    }),
    new webpack.HashedModuleIdsPlugin()
]

Object.keys(pages).forEach(pagesName => {
    let [fileName, Template] = ['', '']
    if (pagesName === 'index') {
        fileName = `./${pagesName}.html`,
            Template = `${config.common.pluginOutput}/${pagesName}/${pagesName}.${config.common.fileType}`
    } else {
        fileName = `./view/${pagesName}.html`,
            Template = `${config.common.pluginOutput}/${pagesName}/${pagesName}.${config.common.fileType}`
    }
    const conf = {
        filename: fileName,
        template: Template,
        inject: true,
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
        },
        chunks: ['manifest', 'vendor', pagesName],
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
    }
    plugin.push(
        // generate dist login.vue.html with correct asset hash for caching.
        // you can customize output by editing /login.vue.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin(conf)
    )
})

const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: plugin
})

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
