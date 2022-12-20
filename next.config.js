
const withPWA = require('next-pwa')({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	scope: '/',
	sw: 'service-worker.js',
  })
  
module.exports = withPWA({
    reactStrictMode: true,
    swcMinify: true,
    experimental:{appDir:true},
    images: {
      domains: ['res.cloudinary.com'],
    },
})