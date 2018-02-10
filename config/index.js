'use strict'
const path = require('path');
module.exports = {
	dev: {
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api': {
				target: 'https://a.91jfk.com',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			},
			'/weather': {
				target: 'http://www.sojson.com',
				changeOrigin: true,
				pathRewrite: {
					'^/weather': ''
				}
			}
		},
		host: 'localhost', 
		port: 8081, 
		autoOpenBrowser: true,
		errorOverlay: true,
		notifyOnErrors: true,
		poll: false, 
		devtool: 'eval-source-map',
		cacheBusting: true,
		cssSourceMap: false,
	},
	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: false,
		devtool: '#source-map',
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	}
}
