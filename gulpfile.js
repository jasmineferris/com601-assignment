const gulp = require('gulp');

/*
    -- TOP LEVEL FUNCTIONS --

    gulp.task -- defines tasks
    gulp.src -- points to files to use
    gulp.dest -- points to output
    gulp.watch -- watch files and folders for changes
*/

// LOGS MESSAGE
gulp.task('message', function(){
    return console.log('Gulp is running');
});