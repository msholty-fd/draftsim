module.exports = function(config) {
    config.set({

        browsers: ['PhantomJS'],
        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'app/**/*.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'app/**/*.spec.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },

        reporters: ['dots']

        // define reporters, port, logLevel, browsers etc.
    });
};
