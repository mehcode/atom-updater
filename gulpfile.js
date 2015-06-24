require('babel/register')

var gulp = require('gulp')
var $ = require("gulp-load-plugins")()

gulp.task("build", function() {
  return gulp.src("src/**/*.js")
    .pipe($.babel())
    .pipe(gulp.dest("lib"))
})
