'use strict'
// see http://vuejs-templates.github.io/webpack for documentation.
/**
 * 项目配置参数
 * @type {string}
 */
const projectName = 'saiku'
const filenameExtension = 'pug'

/**
 * 项目详细配置
 */
const path = require('path')

module.exports = {
  common: {
    fileType: `${filenameExtension}`,
    folderName: `${projectName}`,
    entranceHtml: path.resolve(__dirname, `../${projectName}/src/view/**/*.${filenameExtension}`), //入口html文件
    entranceJs: path.resolve(__dirname, `../${projectName}/src/view/*/*.js`),
    pluginOutput: path.resolve(__dirname, `../${projectName}/src/view/`) //html-webpapck-plugin 入口
  },
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, `../${projectName}/dist`), //output 路径
    // index: path.resolve(__dirname, '../dist/index.html'),
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8030,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
