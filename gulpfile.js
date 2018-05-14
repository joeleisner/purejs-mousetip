const babel    = require('gulp-babel');
const config   = require('./gulp/config');
const gulp     = require('gulp');
const header   = require('./gulp/header');
const inject   = require('gulp-inject-string');
const rename   = require('./gulp/rename');
const uglify   = require('gulp-uglify');
const uglifyes = require('gulp-uglifyes');

gulp.task('build-legacy', () => {
    gulp.src(config.src)
        .pipe(babel())
        .pipe(header())
        .pipe(gulp.dest(config.dest))
        .pipe(uglify())
        .pipe(header(true))
        .pipe(rename())
        .pipe(gulp.dest(config.dest));
});

gulp.task('build-es2015', () => {
    gulp.src(config.src)
        .pipe(header())
        .pipe(rename('.es2015'))
        .pipe(gulp.dest(config.dest))
        .pipe(uglifyes())
        .pipe(header(true))
        .pipe(rename())
        .pipe(gulp.dest(config.dest));
});

gulp.task('build-commonjs-module', () => {
    gulp.src(config.src)
        .pipe(rename('.common'))
        .pipe(inject.append(config.modules.append.commonjs))
        .pipe(gulp.dest(config.modules.dest));
});

gulp.task('build-es2015-module', () => {
    gulp.src(config.src)
        .pipe(rename('.es2015'))
        .pipe(inject.append(config.modules.append.es2015))
        .pipe(gulp.dest(config.modules.dest));
});

gulp.task('build-modules', ['build-commonjs-module', 'build-es2015-module']);

gulp.task('build', ['build-legacy', 'build-es2015', 'build-modules']);

gulp.task('watch', () => gulp.watch(config.watch, ['build']));

gulp.task('default', ['watch']);
