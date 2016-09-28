const argv = require('yargs')
	.default('sourcemaps', true)
	.argv;

const env = process.env.NODE_ENV || 'development';
const isProduction = (env === 'production' || process.env.PRODUCTION === 'true');

export {
	env,
	isProduction,
	argv
};
