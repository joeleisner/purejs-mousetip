const build = require('./build'),
    gulp    = require('gulp');

function watch(type) {
    function method() {
        gulp.watch('src/mousetip.js', build[type]);
    }

    method.displayName = [
        'watch',
        type === 'all' ? '' : type
    ].filter(Boolean).join(':');

    return method;
}

module.exports = {
    all: watch('all'),
    exp: watch('exp'),
    min: watch('min'),
    ref: watch
};