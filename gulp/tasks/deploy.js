import gulp from 'gulp';
import config from '../config';

import merge from 'merge2';
import git from 'git-rev-sync';

import template from 'gulp-template';
import rename from 'gulp-rename';
import awspublish from 'gulp-awspublish';
import gutil from 'gulp-util';

import {isProduction} from '../options';

const CACHE_TIMEOUT_MAX = 356 * 24 * 60 * 60;
const CACHE_TIMEOUT_SHORT = 2 * 60;

gulp.task('deploy-branch', deployBranch());

gulp.task('deploy', deploy(git.short(), CACHE_TIMEOUT_MAX));

function deployBranch() {
    const branch = process.env.BRANCH;
    const deployPath = branch ? branch.replace('origin/', '') : git.branch();

    return deploy(deployPath, CACHE_TIMEOUT_SHORT);
}

function deploy(deployPath, cacheTimeout) {
    if (!deployPath) {
        return;
    }
    deployPath = slugify(deployPath);

    const publishTask = awsPublish(deployPath, cacheTimeout);

    if (isProduction) {
        gutil.log(gutil.colors.magenta('WARNING: Local environment variable PRODUCTION is set to "true".'));
    }

    return publishTask;
}

function awsPublish(deployPath, cacheTimeout) {
    function awsScoutFile(aws) {
        return gulp.src(['app/scout.js'])
            .pipe(template({
                uiBase: getUiBase(aws, deployPath),
                styleguideBase: config.STYLEGUIDE_BASE,
                styleguideTestUrl: config.STYLEGUIDE_TEST_URL,
                styleguideVersion: config.STYLEGUIDE_VERSION,
                styleguideLocalPort: config.STYLEGUIDE_LOCAL_PORT,
                deployPath,
                livereload: false
            }));
    }

    return function() {
        const aws = getAws();
        const headers = getHeaders(cacheTimeout);
        const publisher = getPublisher(aws);

        return merge(
                publish(gulp.src(['build/*', '!build/*.map', '!build/scout.js']), headers.files),
                publish(awsScoutFile(aws), headers.scout)
            );

        function publish(src, publisHeaders) {
            return src.pipe(rename(function(path) {
                    path.dirname += `/${deployPath}`;
                }))
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(publisHeaders))
                .pipe(awspublish.reporter());
        }
    };
}

function getAws() {
    return {
        key: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: isProduction ? 'ui-assets-prod' : 'ui-assets-dev'
    };
}

function getPublisher(aws) {
    return awspublish.create(aws);
}

function getHeaders(cacheTimeout) {
    return {
        files: {
            'Cache-Control': `max-age=${cacheTimeout}, no-transform, public`
        },
        scout: {
            'Cache-Control': 'max-age=60, no-transform, public'
        }
    };
}

function getUiBase(aws, deployPath) {
    if (isProduction) {
        return `${config.UI_CLOUDFRONT_URL}${deployPath}/`;
    } else {
        return `${config.UI_S3_URL}${aws.bucket}/${deployPath}/`;
    }
}

function slugify(input) {
    return input ? input.toLowerCase().replace(/[^\d\w]+/g, '-') : input;
}
