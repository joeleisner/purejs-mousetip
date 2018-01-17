const rename = require('gulp-rename');

module.exports = () => rename({ suffix: '.min' });
