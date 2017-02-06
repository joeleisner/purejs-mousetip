let config =  require('./gulp/config'),
    gulp =    require('gulp'),
    header =  require('./gulp/header'),
    include = require('gulp-include'),
    rename =  require('gulp-rename'),
    uglify =  require('gulp-uglify');

// Default
gulp.task('default', ['watch']);

// Watch
gulp.task('watch', () => gulp.watch(config.watch, ['compile']));

// Compile
gulp.task('compile', () => {
    return gulp.src(config.src)        // Input
        .pipe(include())               // Include modules
        .pipe(header())                // Header
        .pipe(gulp.dest(config.dest))  // Expanded output
        .pipe(uglify())                // Uglify
        .pipe(header(true))            // Header
        .pipe(rename({suffix:'.min'})) // Rename
        .pipe(gulp.dest(config.dest)); // Minified output
});
