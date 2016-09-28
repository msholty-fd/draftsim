import gulp from 'gulp';

import eslint from 'gulp-eslint';
import jscs from 'gulp-jscs';
import htmlhint from 'gulp-htmlhint';

import config from '../config';

gulp.task('lint', ['lint:html'], function() {
	return gulp.src(config.src.js)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
		.pipe(jscs());
});

gulp.task('lint:html', function() {
	return gulp.src(config.src.html)
		.pipe(htmlhint('.htmlhintrc'))
		.pipe(htmlhint.reporter());
});
