const config =  require('./gulp/config');
const gulp =    require('gulp');
const header =  require('./gulp/header');
const include = require('gulp-include');
const rename =  require('./gulp/rename');
const uglify =  require('gulp-uglify');

gulp.task('build', () => {
    gulp.src(config.src)               // Input
        .pipe(include())               // Include modules
        .pipe(header())                // Header
        .pipe(gulp.dest(config.dest))  // Expanded output
        .pipe(uglify())                // Uglify
        .pipe(header(true))            // Header
        .pipe(rename())                // Rename
        .pipe(gulp.dest(config.dest)); // Minified output
});

gulp.task('watch', () => gulp.watch(config.watch, ['build']));

gulp.task('default', ['watch']);
