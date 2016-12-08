var header = require('gulp-header'),
    pkg = require('../package.json');

module.exports = function(min) {
    var bannerExp = [
        '/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @version <%= pkg.version %>',
        ' * @author <%= pkg.author %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        '',
        ''
    ].join('\n');
    var bannerMin = [
        '/* <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %> | <%= pkg.homepage %> */',
        ''
    ].join('\n');
    return min ? header(bannerMin, {pkg:pkg}) : header(bannerExp, {pkg:pkg});
};
