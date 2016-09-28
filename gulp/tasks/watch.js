import config from '../config';

import gulp from 'gulp';

gulp.task('watch', function() {
	gulp.watch(config.src.sass, ['sass']);
	gulp.watch(config.src.assets.concat(config.src.js), ['copy']);
});
