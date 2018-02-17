var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var fs = require('fs');
var path = require('path');
var minifyHTML = require('gulp-minify-html');



// css and js file for minification
gulp.task('useref', function(){
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify({
      compress: {
        drop_console: true
      }
     })))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// images
gulp.task('images', function(){
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/img'))
});

// copy fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// copy views
gulp.task('views', function() {
  return gulp.src('src/views/**/*')
  .pipe(gulp.dest('dist/views'))
})

// copy js
gulp.task('js', function() {
  return gulp.src('src/js/**/**/**/**/*')
  .pipe(gulp.dest('dist/js'))
})

// after copied all html ,css and js file make minification files
gulp.task('minify-ctrl', function() {
	var opts = {comments:true,spare:true};
  gulp.src('dist/views/**/**/**/**/*.js')
    .pipe(uglify({
      compress: {
        drop_console: true
      }
     }))
    .pipe(gulp.dest('dist/views/'));
});

gulp.task('minify-html', function() {
	var opts = {comments:true,spare:true};
  gulp.src('dist/views/**/**/**/**/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist/views/'))
});

gulp.task('minify-css', function(){
  return gulp.src('dist/views/**/**/**/**/*.css')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist/views/'))
});

// delete dist
gulp.task('clean', function() {
  return del.sync('dist');
})

// clear cache
gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback)
})


gulp.task('dev', function (callback) {
    runSequence(
        'clean',
        'cache:clear',
        ['useref',
        'fonts',
        'images'],
        'watch',
    callback);
});

gulp.task('prod', function(callback){
    runSequence(
        'clean',
        'cache:clear',
        ['useref',
        'fonts',
        'images','views','js'],
        'minify-ctrl',
        'minify-html',
        'minify-css',
        callback
    );
});


gulp.task('watch', function() {
    gulp.watch('./src/**/**/*.*', function () {
        runSequence('useref');
    });
});

gulp.task('default', function () {
    runSequence('dev');
});