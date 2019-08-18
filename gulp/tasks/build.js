const gulp = require('gulp'),
    modules = require('./modules'),
    scripts = require('./scripts');

function build(type) {
    if (type === 'all') return gulp.series(gulp.parallel(build('exp'), build('min')));

    return gulp.series(gulp.parallel(modules.all, scripts.all[type]));
}

module.exports = {
    all: build('all'),
    exp: build('exp'),
    min: build('min'),
    ref: build
};