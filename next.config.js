const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		swSrc: './public/service-worker.js',
		// runtimeCaching,
		// importScripts: ['./pwa-worker.js'],
	},
})
