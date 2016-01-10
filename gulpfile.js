/**
 * Client Gulp Tasks
 * ---
 */
"use strict";

var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var plugins = loadPlugins();
//var browserify = require('browserify');
//var source = require('vinyl-source-stream');
//var buffer = require('vinyl-buffer');
var runSequence = require('run-sequence');
//var fs = require('fs');
//var csv = require('csv-string');

/**
 * Compile SASS to CSS
 */
gulp.task('styles', function () {
    return gulp
        .src(['app/**/*.scss'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            style: 'compressed',
            includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']
        }).on('error', plugins.sass.logError))
        .pipe(plugins.concat('app-styles.css'))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('public'))
        .pipe(plugins.filter('*.css'))
        .pipe(plugins.livereload());
});

gulp.task('xml2json', function() {
    return gulp
        .src(['node_modules/xml2js/lib/xml2js.js'])
        .pipe(plugins.browserify())
        .pipe(plugins.concat('xml2json.js'))
        .pipe(gulp.dest('public'));
});

/**
 * Concat all scripts together
 */
gulp.task('scripts', function() {
    return gulp
        .src(['app/**/*.js'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('app-scripts.js'))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('public'))
        .pipe(plugins.livereload());
});

/**
 * Copy angular templates
 */
gulp.task('templates', function () {
    return gulp
        .src('client/**/*.html')
        .pipe(gulp.dest('public'))
        .pipe(plugins.livereload());
});

/**
 * Watch for file changes and compile/reload
 */
gulp.task('watch', function () {
    gulp.watch('app/**/*.scss', ['styles']);
    gulp.watch('app/**/*.js', ['scripts']);
    gulp.watch(['app/**/*.html'], ['templates']);
    gulp.watch(['app/**/*.html', 'index.html'], plugins.livereload.changed);
    plugins.livereload.listen();
});

/**
 * Clean build directories
 */
gulp.task('clean', function (cb) {
    var del = require('del');
    return del(['public'], cb);
});

///**
// * Load stylesheets from HTML, concat and minify
// */
//gulp.task('build:styles', ['browserify', 'styles', 'scripts', 'templates'], function () {
//    var config = require('config');
//    return gulp
//        .src('server/views/index.ejs')
//        .pipe(plugins.readmin({type: 'css'}))
//        .pipe(plugins.concat('styles.css'))
//        .pipe(gulp.dest('build'));
//});
//
///**
// * Load styles from HTML, concat and minify
// */
//gulp.task('build:scripts', ['browserify', 'styles', 'scripts', 'templates'], function () {
//    var config = require('config');
//    return gulp
//        .src('index.html')
//        .pipe(plugins.readmin({type: 'js'}))
//        .pipe(plugins.ngAnnotate())
//        .pipe(plugins.concat('scripts.js'))
//        .pipe(gulp.dest('build'));
//});
//
///**
// * Build
// */
//gulp.task('build', function(done) {
//    runSequence('clean', ['build:styles', 'build:scripts', 'fonts', 'assets'], done);
//});
//

///**
// * Copy icon fonts
// */
//gulp.task('fonts', function () {
//    return gulp
//        .src(['node_modules/bootstrap/fonts/*', 'node_modules/font-awesome/fonts/*'])
//        .pipe(gulp.dest('build/fonts'));
//});
//
///**
// * Copy images
// */
//gulp.task('assets', function () {
//    return gulp
//        .src('client/assets/**')
//        .pipe(gulp.dest('build'));
//});

/**
 * Start the development environment
 */
gulp.task('default', function(done) {
    runSequence('clean', [
        'styles',
        'scripts',
        //'xml2json',
        'templates',
        'watch'
    ], done);
});