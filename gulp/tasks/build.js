import gulp from 'gulp';

import runSequence from 'run-sequence';

gulp.task('build', function() {
	runSequence('clean', 'lint', ['copy', 'sass', 'browserify']);
});
