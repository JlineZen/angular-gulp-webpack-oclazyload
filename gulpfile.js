var gulp = require('gulp');
var webpack = require('webpack-stream');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var cache = require('gulp-cache');
var swallowError = function(error) {
    console.log(error.toString());
    this.emit('end');
};

/**
 * @desc use gulp to build webpack task
 */

gulp.task('webapck', function() {
    return gulp.src('./src/app.js')  // webpack entry file
        .pipe(webpack(require('./webpack.config.js'))) // webpack config
        .on('error', swallowError) // handle error when gulp watch
        .pipe(gulp.dest('./dist/js'));
});

/**
 * @desc minify css file
 */

gulp.task('minify-css', function() {
    gulp.src('./src/style/*.css')
        .pipe(cleanCss())
        .on('error', swallowError)
        .pipe(gulp.dest('./dist/style'));
});


/**
 * @desc build watch task
 */
gulp.task('watch', ['webpack', 'minify-css'], function() {
    gulp.watch('src/**/*.js', ['webapck']);
    gulp.watch('src/**/*.css', ['minify-css']);
});

/**
 * clean dist
 */

gulp.task('clean', function() {
    return del.sync('./dist');
});

gulp.task('default', ['clean', 'watch']);