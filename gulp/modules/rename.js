const rename  = require('gulp-rename'),
    formats = {
        common: 'common',
        legacy: 'legacy',
        modern: ''
    };

module.exports = (type, format) => {
    const typeSuffix = type === 'min' ? 'min' : '',
        formatSuffix = formats[format];

    let suffix = [ formatSuffix, typeSuffix ].filter(Boolean).join('.');

    if (suffix) suffix = `.${ suffix }`;

    return rename({ suffix });
};
