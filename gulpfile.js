// Require
var config = require('./gulp/config'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    header = require('./gulp/header'),
    include = require('gulp-include'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Default Task
gulp.task('default', ['watch']);

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.watch, ['compile']);
});

// Clean JS Task
gulp.task('clean', function() {
    return gulp.src(config.dest, {read:false})
        .pipe(clean());
});

// Compile JS task
gulp.task('compile', ['clean'], function() {
    return gulp.src(config.src)        // Input
        .pipe(include())               // Include modules
        .pipe(header())                // Header
        .pipe(gulp.dest(config.dest))  // Expanded output
        .pipe(uglify())                // Uglify
        .pipe(header(true))            // Header
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(config.dest)); // Minified output
});
