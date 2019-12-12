var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

// LOGS MESSAGE
gulp.task('message', async function(){
    return console.log('Gulp is running');
});

// COPY HTML FILES
gulp.task ('html_copy', async function(){
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
});

// OPTIMISE IMAGE FILES
gulp.task ('img_opt', async function(){
    gulp.src('img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// MINIFY JAVASCRIPT
gulp.task ('js_min', async function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// COMPILE SASS
gulp.task ('sass_compile', async function(){
    gulp.src('css/*.css')
    .pipe(gulp.dest('dist/css'));
});

// WATCHES FOR CHANGES IN THE MAIN SOURCE FILE, IF CHANGED, IT RUNS COMPILE FUNCTIONS AGAIN
gulp.task('compile_all', async function(){
    gulp.watch('*.html', ['html_copy']);
    gulp.watch('img/*', ['img_opt']);
    gulp.watch('js/*.js', ['js_min']);
    gulp.watch('css/*.css', ['sass_compile']); 
})