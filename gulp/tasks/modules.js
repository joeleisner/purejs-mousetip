const gulp             = require('gulp'),
    { append: inject } = require('gulp-inject-string'),
    rename             = require('../modules/rename');

function modules(format) {
    if (!format) return gulp.series(gulp.parallel(modules('common'), modules('modern')));

    const exportFormat = {
        common: 'module.exports = MouseTip;',
        modern: 'export default MouseTip;'
    };

    function method() {
        return gulp.src('src/mousetip.js')
            .pipe(inject(`\n\n${ exportFormat[format] }`))
            .pipe(rename('exp', format))
            .pipe(gulp.dest('dist/modules'));
    }

    method.displayName = [
        'modules',
        format
    ].filter(Boolean).join(':');

    return method;
}

module.exports = {
    all:    modules(),
    common: modules('common'),
    modern: modules('modern'),
    ref:    modules
};