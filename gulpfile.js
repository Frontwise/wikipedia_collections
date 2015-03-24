var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less_frontend', function() {
  gulp.src(['web/less/frontend/**/*.less'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(concat('frontend.css'))
      .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/compiled'))
  ;
});

gulp.task('less_backend', function() {
  gulp.src([
      'web/vendor/bootstrap/dist/css/bootstrap.css',
      'web/css/crud.css',
      'web/less/backend/**/*.less',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(concat('backend.css'))
      .pipe(autoprefixer({ browsers: ['> 5%'] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/compiled'))
  ;
});

gulp.task('js_backend', function() {
  gulp.src([
      'web/vendor/jquery/dist/jquery.js',
      'web/js/backend/**/*.js',
    ])
    .pipe(sourcemaps.init())
      .pipe(concat('backend.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/compiled'))
    .pipe(livereload())
  ;
});

gulp.task('watch', function() {
    livereload.listen();

    gulp.watch('web/less/**/*.less', ['less']);
    gulp.watch('web/js/**/*.js', ['js']);

    gulp.watch([
      'src/**/*',
      'app/config/*',
      'web/**/*.html',
      'web/compiled/**/*.css',
      'web/css/**/*.css',
      'web/compiled/**/*.js',
      'web/img/**/*',
    ], livereload.reload);
    
    gulp.watch('gulpfile.js', process.exit);
});

gulp.task('js', ['js_backend']);
gulp.task('less', ['less_frontend', 'less_backend']);
gulp.task('default', ['less', 'js']);