import config from '../config';
import { isProduction, argv } from '../options';

import _ from 'lodash';

import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import connect from 'gulp-connect';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import collapse from 'bundle-collapser/plugin';

import watchify from 'watchify';
import browserify from 'browserify';

import babelify from 'babelify';
import partialify from 'partialify';
import ngannotate from 'browserify-ngannotate';

gulp.task('browserify', function() {
	let bundler = null;
	let opts = null;
	const baseOpts = {
		entries: ['./app/app.js'],
		fullPaths: false,
		extensions: ['.js', '.html', '.json'],
		paths: ['./node_modules', './app']
	};

	if (isProduction) {
		opts = _.cloneDeep(baseOpts);

		bundler = browserify(opts);
	} else {
		opts = _.extend({}, watchify.args, baseOpts, {
			cache: {},
			packageCache: {},
			debug: argv.sourcemaps
		});

		bundler = watchify(browserify(opts));

		bundler.on('log', gutil.log.bind(gutil, gutil.colors.magenta('Watchify build:')));

		bundler.on('update', bundle);
	}

	bundler.transform(babelify.configure({
		compact: false
	}));
	bundler.transform(partialify);
	bundler.transform(ngannotate, {
		// see: https://github.com/olov/ng-annotate/issues/64#issuecomment-102426309
		// and: https://github.com/olov/ng-annotate/issues/189#issuecomment-131496880
		regexp: /(?:[_]?angular[\d]*(\[[\'\"]?[\w\d]+[\'\"]?\])?\.)?[_]?module[\d]*(?:\[[\'\"]?[\w\d]+[\'\"]?\])?.*|^[a-zA-Z0-9_\$\.\s]+$/
	});

	bundler.plugin(collapse);

	function bundle() {
		return bundler.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error\n'))
			.pipe(source('app.js'))
			.pipe(buffer())
			.pipe(gulpif(argv.sourcemaps, sourcemaps.init({
				loadMaps: true
			})))
			.pipe(gulpif(isProduction, uglify({
				mangle: true,
				compress: {
					drop_console: true
				}
			})))
			.pipe(gulpif(argv.sourcemaps, sourcemaps.init({
				loadMaps: true
			})))
			.pipe(gulp.dest(config.build))
			.pipe(gulpif(!isProduction, connect.reload()));
	}

	return bundle();
});
