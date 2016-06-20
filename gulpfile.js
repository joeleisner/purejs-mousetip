// Require
var config = require('./gulpconfig.js'),
    pkg = require('./package.json'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    header = require('gulp-header'),
    include = require('gulp-include'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// Variables
var banner = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version <%= pkg.version %>',
    ' * @author <%= pkg.author %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    '',
    ''
].join('\n');

// Default Task
gulp.task('default', ['watch']);

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.watch, ['build']);
});

// Build Task
gulp.task('build', ['build-exp', 'build-min']);

// Clean JS Task
gulp.task('clean', function() {
    return gulp.src(config.dest, {read:false})
        .pipe(clean());
});

// Build JS Expanded Task
gulp.task('build-exp', ['clean'], function() {
    return gulp.src(config.src)
        .pipe(include())
        .pipe(header(banner, {pkg:pkg}))
        .pipe(gulp.dest(config.dest));
});

// Build JS Minified Task
gulp.task('build-min', ['clean'], function() {
    return gulp.src(config.src)
        .pipe(include())
        .pipe(uglify())
        .pipe(header(banner, {pkg:pkg}))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest(config.dest));
});

// Move to Demo Task
gulp.task('move-to-demo', ['build'], function() {
    return gulp.src(config.dest + '/*.js')
        .pipe(gulp.dest('demo/assets/js'));
});
