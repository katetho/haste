const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const terser = require('gulp-terser');
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require('browser-sync').create();

gulp.task('msg', function () {
  return console.log('gulp is running');
})

gulp.task('htmls', function() {
  gulp.src('views/*.handlebars')
  .pipe(browserSync.stream());
  gulp.src('views/layouts/*.handlebars')
  .pipe(browserSync.stream());
  gulp.src('views/partials/*.handlebars')
  .pipe(browserSync.stream());
})

gulp.task('concatenate-js', function() {
  gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(terser())
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.stream());
})

gulp.task('sass', function() {
  gulp.src("src/scss/*.scss")
  .pipe(plumber())
  .pipe(sass({
    outputStyle: "expanded",
    includePaths: "./node_modules",
  }))
  .on("error", sass.logError)
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulp.dest("public/css"))
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(cleanCSS())
  .pipe(gulp.dest("public/css"))
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
  gulp.watch('src/views/partials/*.handlebars', ['htmls']),
  gulp.watch('src/js/*.js', ['concatenate-js']),
  gulp.watch('src/scss/**/*.scss', ['sass'])
})
