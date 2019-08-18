const build = require('./gulp/tasks/build'),
    gulp    = require('gulp'),
    modules = require('./gulp/tasks/modules'),
    scripts = require('./gulp/tasks/scripts'),
    watch   = require('./gulp/tasks/watch');

// Build -------------------------------------------
gulp.task('build',                       build.all);
gulp.task('build:exp',                   build.exp);
gulp.task('build:min',                   build.min);
// Modules -----------------------------------------
gulp.task('modules',                   modules.all);
gulp.task('modules:common',         modules.common);
gulp.task('modules:modern',         modules.modern);
// Scripts -----------------------------------------
gulp.task('scripts',               scripts.all.all);
gulp.task('scripts:exp',           scripts.all.exp);
gulp.task('scripts:min',           scripts.all.min);
gulp.task('scripts:legacy',     scripts.legacy.all);
gulp.task('scripts:legacy:exp', scripts.legacy.exp);
gulp.task('scripts:legacy:min', scripts.legacy.min);
gulp.task('scripts:modern',     scripts.modern.all);
gulp.task('scripts:modern:exp', scripts.modern.exp);
gulp.task('scripts:modern:min', scripts.modern.min);
// Watch -------------------------------------------
gulp.task('watch',                       watch.all);
gulp.task('watch:exp',                   watch.exp);
gulp.task('watch:min',                   watch.min);