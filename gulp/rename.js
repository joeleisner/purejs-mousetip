const rename = require('gulp-rename');

module.exports = (suffix) => rename({ suffix: suffix || '.min' });
