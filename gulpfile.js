'use strict';
const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const del           = require('del');
const newer         = require('gulp-newer');
const gulpIf        = require('gulp-if');
const remember     = require('gulp-remember');
const cached       = require('gulp-cached');
const path         = require('path');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss    = require('gulp-minify-css');
const browserSync  = require('browser-sync');
const notify       = require('gulp-notify');
const plumber      = require('gulp-plumber');
const babel        = require('gulp-babel');
const jsmin        = require('gulp-jsmin');
const isDevelopment = !process.env.NODE_ENV ||  process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
    return gulp.src('sass/**/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (error) {
                return{
                    message: error.message
                };
            })
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(cached('styles'))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(remember('styles'))
        .pipe(minifyCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('css'))
});



gulp.task('clean', function () {
    return del('public');
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles')));


gulp.task('watch', function () {
    gulp.watch('sass/**/*.*', gulp.series('styles')).on('unlink', function (filepath) {
        console.log(path.basename('sass/style.scss'));
        remember.forget('styles', path.basename(filepath));
        delete cached.caches.styles[path.basename(filepath)];
    });

});



gulp.task('server',function(){
    browserSync.init({
        server:'./'
    });
    browserSync.watch('./**/*.*').on('change', browserSync.reload);
});

gulp.task('babel', () => {
    return gulp.src('js/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError(function (error) {
                return{
                    message: error.message
                };
            })
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(jsmin())
        .pipe(gulp.dest('js5/'));
});
gulp.task('babelW', () => {
    gulp.watch('js/**/*.js', gulp.series('babel'))
});



gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'babelW', 'server')));



