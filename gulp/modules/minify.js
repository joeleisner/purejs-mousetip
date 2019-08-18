const empty = require('gulp-empty'),
    terser  = require('gulp-terser'),
    uglify  = require('gulp-uglify');

module.exports = (type, format) => type === 'min' ? format === 'modern' ? terser() : uglify() : empty();