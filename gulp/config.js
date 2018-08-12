module.exports = {
    dest:    'dist',
    modules: {
        append: {
            common: '\nmodule.exports = MouseTip;',
            es2015: '\nexport default MouseTip;'
        },
        dest:   'dist/modules'
    },
    src:     'src/mousetip.js',
    watch:   'src/**/*.js'
};
