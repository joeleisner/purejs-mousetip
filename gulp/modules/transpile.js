const babel = require('gulp-babel'),
    empty   = require('gulp-empty');

module.exports = format => format === 'legacy' ? babel() : empty();