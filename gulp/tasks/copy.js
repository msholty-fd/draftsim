import config from '../config';

import merge from 'merge2';

import gulp from 'gulp';

import connect from 'gulp-connect';

gulp.task('copy', function() {
	return merge(
			gulp.src(config.src.assets)
		)
		.pipe(gulp.dest(config.build))
		.pipe(connect.reload());
});
