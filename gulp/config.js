module.exports = {
    dest:    'dist',
    modules: {
        append: {
            commonjs: '\nmodule.exports = MouseTip;',
            es2015:   '\nexport default MouseTip;'
        },
        dest:   'dist/modules'
    },
    src:     'src/mousetip.js',
    watch:   'src/**/*.js'
};
