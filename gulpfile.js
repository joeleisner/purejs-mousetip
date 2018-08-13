const gulp = require('gulp'),
    tasks  = require('./gulp/tasks');

gulp.task('build-es2015',                    tasks.es2015);
gulp.task('build-legacy',                    tasks.legacy);
gulp.task('build',                            tasks.all());
gulp.task('build-commonjs-module', tasks.modules.commonJs);
gulp.task('build-es2015-module',     tasks.modules.es2015);
gulp.task('build-modules',            tasks.modules.all());
gulp.task('default',                        tasks.watch());
gulp.task('watch',                          tasks.watch());