const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
	pwa: {
		// swSrc: './public/worker-service.js',
		// register: true,
		sw: '/sw.js',
		runtimeCaching,
		dest: './public',
		// importScripts: ['./worker-service.js'],
	},
})
