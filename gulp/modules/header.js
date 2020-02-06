const header = require('gulp-header'),
    pkg      = require('../../package.json'),
    exp      =
`/*!
 * <%= pkg.name %> - <%= pkg.description %>
 * @version <%= pkg.version %>
 * @author <%= pkg.author %>
 * @link <%= pkg.homepage %>
 * @license <%= pkg.license %>
 */

`,
    min      =
`/*! <%= pkg.name %> <%= pkg.version %> | <%= pkg.license %> | <%= pkg.homepage %> */
`;

module.exports = type => header(type === 'min' ? min : exp, { pkg });
