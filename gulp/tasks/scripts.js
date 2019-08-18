const gulp    = require('gulp'),
    header    = require('../modules/header'),
    minify    = require('../modules/minify'),
    rename    = require('../modules/rename'),
    transpile = require('../modules/transpile');

function scripts(type, format) {
    if (!format) {
        if (!type) return gulp.series(gulp.parallel(scripts('all', 'legacy'), scripts('all', 'modern')));
        return gulp.series(gulp.parallel(scripts(type, 'legacy'), scripts(type, 'modern')));
    }

    if (type === 'all') return gulp.series(gulp.parallel(scripts('exp', format), scripts('min', format)));

    function method() {
        return gulp.src('src/mousetip.js')
            .pipe(transpile(format))
            .pipe(minify(type, format))
            .pipe(header(type))
            .pipe(rename(type, format))
            .pipe(gulp.dest('dist'));
    }

    method.displayName = [
        'scripts',
        format === 'all' ? '' : format,
        type   === 'all' ? '' : type
    ].filter(Boolean).join(':');

    return method;
}

module.exports = {
    all: {
        all: scripts('all'),
        exp: scripts('exp'),
        min: scripts('min')
    },
    legacy: {
        all: scripts('all', 'legacy'),
        exp: scripts('exp', 'legacy'),
        min: scripts('min', 'legacy')
    },
    modern: {
        all: scripts('all', 'modern'),
        exp: scripts('exp', 'modern'),
        min: scripts('min', 'modern')
    },
    ref: scripts
};