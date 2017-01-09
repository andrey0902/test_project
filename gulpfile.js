var gulp        =require('gulp'),
    browserSync =require('browser-sync'),
    notify      =require('gulp-notify'),
    minCss      =require('gulp-minify-css');

gulp.task('default',function () {
    return gulp.src('./css/dopstyle.css')
    .pipe(minCss({KeepBreaks:false}))
        .pipe(notify('success!'))
        .pipe(gulp.dest('./cssMin/'))
});

gulp.task('bs',function () {
    browserSync({
        server:{
            baseDir:'./'
        },
        notify:false
    })
});
gulp.task('watch',['default','bs'],function () {
    qulp.watch('./js/**/*.js',browserSync.reload);
    qulp.watch('./tpl/**/*.html',browserSync.reload)
})
