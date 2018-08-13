const babel  = require('gulp-babel'),
    config   = require('./config'),
    gulp     = require('gulp'),
    header   = require('./header'),
    inject   = require('gulp-inject-string'),
    rename   = require('./rename'),
    uglify   = require('gulp-uglify'),
    uglifyes = require('gulp-uglifyes');

function buildScript(type) {
    const { dest, src } = config;
    return gulp.src(src)
        .pipe(type ? rename('.' + type) : babel())
        .pipe(header())
        .pipe(gulp.dest(dest))
        .pipe(type ? uglifyes() : uglify())
        .pipe(header(true))
        .pipe(rename())
        .pipe(gulp.dest(dest));
}

function buildModule(type) {
    const { modules, src } = config,
        { append, dest }   = modules;
    return gulp.src(src)
        .pipe(rename('.' + type))
        .pipe(inject.append(append[type]))
        .pipe(gulp.dest(dest));
}

module.exports = {
    all() {
        const { es2015, legacy, modules } = this;
        return gulp.series(gulp.parallel(es2015, legacy, modules.all()));
    },
    es2015() { return buildScript('es2015'); },
    legacy() { return buildScript(); },
    modules: {
        all() {
            const { commonJs, es2015 } = this;
            return gulp.series(gulp.parallel(commonJs, es2015));
        },
        commonJs() { return buildModule('common'); },
        es2015()   { return buildModule('es2015'); }
    },
    watch() {
        const { all } = this;
        return () => gulp.watch(config.watch, all.bind(this)());
    }
};