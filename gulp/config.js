const config = {};

config.UI_S3_URL = '//s3.amazonaws.com/';
config.UI_CLOUDFRONT_URL = '//d9fsetxygehvw.cloudfront.net/';
config.WAM_LOCAL_PORT = 3000;

config.LIVERELOAD_PORT = 35727;
config.LIVERELOAD_URL = `https://localhost:${config.LIVERELOAD_PORT}/livereload.js?snipver=1`;

config.app = './app';
config.build = './build';

config.src = {
	html: [
		'./app/**/*.html'
	],
	js: [
		'./app/**/*.js'
	],
	sass: [
		'./app/**/*.scss'
	],
	assets: [
		'./app/index.html',
		'./app/assets/**/*'
	]
};

export default config;
