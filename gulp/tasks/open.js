import gulp from 'gulp';

import open from 'gulp-open';

gulp.task('open', function() {
    return gulp.src(__filename)
        .pipe(open({uri: 'https://localhost:9000'}));
});
