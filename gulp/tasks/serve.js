import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('serve', function() {
	runSequence(['connect'], 'clean', ['copy', 'sass', 'browserify'], 'watch', 'open');
});
