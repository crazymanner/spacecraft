var gulp = require('gulp');
var browserSync = require('browser-sync').create();
 
// browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
})
 
// watch
gulp.task('watch', function() {
        // Reloads the browser whenever HTML files change
        gulp.watch(['**/*.js', '**/*.css', '**/*.html', '!node_modules/**', '!vendor/**', '!bin/**'], browserSync.reload);
});
 
// gulp default
gulp.task('default', ['browserSync','watch']);