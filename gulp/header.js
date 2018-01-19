const header = require('gulp-header');
const pkg =    require('../package.json');

module.exports = min => {
    const bannerExp =
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
    return header(min ? bannerMin : bannerExp, { pkg });
};
