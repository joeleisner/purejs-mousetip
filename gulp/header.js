let header = require('gulp-header'),
    pkg =    require('../package.json');

module.exports = min => {
    let bannerExp =
`/**
 * <%= pkg.name %> - <%= pkg.description %>
 * @version <%= pkg.version %>
 * @author <%= pkg.author %>
 * @link <%= pkg.homepage %>
 * @license <%= pkg.license %>
 */

`,
    bannerMin =
`/* <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %> | <%= pkg.homepage %> */

`;
    return min ? header(bannerMin, {pkg}) : header(bannerExp, {pkg});
};
