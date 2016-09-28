import config from '../config';
import {isProduction} from '../options';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import base64 from 'gulp-base64';
import autoprefixer from 'gulp-autoprefixer';
import connect from 'gulp-connect';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import cssnano from 'gulp-cssnano';

gulp.task('sass', function() {
	return gulp.src(config.src.sass)
		.pipe(sourcemaps.init())
		.pipe(sass())
		// .pipe(scssLint({'config': './.scss-lint.yml'}))
		.pipe(base64())
		.pipe(autoprefixer())
		.pipe(concat('app.css', {
			newLine: ''
		}))
		.pipe(gulpif(isProduction, cssnano({
			mergeRules: false,
			safe: true
		})))
		.pipe(gulpif(!isProduction, connect.reload()))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.build));
});

