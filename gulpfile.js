var gulp = require('gulp');
var sass = require('gulp-sass');

function style(){
    return(gulp.src("app/scss/*.scss")
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(gulp.dest("app/css")));
}

exports.style = style;