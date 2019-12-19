const gulp = require('gulp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('msg', function () {
  return console.log('gulp is running');
})

gulp.task('htmls', function() {
  gulp.src('src/views/*.handlebars')
  .pipe(gulp.dest('public/views'))
  .pipe(browserSync.stream());
  gulp.src('src/views/layouts/*.handlebars')
  .pipe(gulp.dest('public/views/layouts'))
  .pipe(browserSync.stream());
})

gulp.task('concatenate-js', function() {
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream());
})

gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.stream());
})

gulp.task('default', ['msg', 'htmls', 'concatenate-js', 'sass']);

gulp.task('watch', function() {
  browserSync.init(null, {
		proxy: "http://localhost:3002",
        files: ["public/**/*.*"],
        port: 5000,
	});
  gulp.watch('src/views/*.handlebars', ['htmls']),
  gulp.watch('src/views/layouts/*.handlebars', ['htmls']),
  gulp.watch('src/js/*.js', ['concatenate-js']),
  gulp.watch('src/sass/*.scss', ['sass'])
})
