const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const config = {
	// generateBuildId: async () => {
	// 	// Return custom build ID, like the latest git commit hash
	// 	return 'my-build-id'
	// },
	...withPWA({
		pwa: {
			// register: true,
			sw: '/sw.js',
			dest: './public',
			runtimeCaching,
			// swSrc: './public/worker-service.js',
			// exclude: [/public/, /.next/]
			importScripts: ['https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'],
		},
	}),

}

module.exports = config

