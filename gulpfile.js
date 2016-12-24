var gulp = require('gulp');

// include plugins
var jshint = require('gulp-jshint'); // js linter: https://github.com/spalger/gulp-jshint
var changed = require('gulp-changed');
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('./views/*.pug')
  .pipe(pug({
    // opts
    pretty: true
  }))
  .pipe(gulp.dest('./html'));
});

gulp.task('watch', function() {
  gulp.watch('./views/*.pug', ['pug'])
});

// var SRC= './js/app.js';
// var DEST = 'dist';
//
// gulp.task('changed', function() {
//   return gulp.src(SRC) // takes file from the path
//   .pipe(changed(DEST)) // creates a new path
//   .pipe(gulp.dest(DEST)); // copies file from src to the new destination
// });
//
// gulp.task('jshint', function() {
//   gulp.src(SRC) // write correct path to see the errors in terminal
//   .pipe(jshint()) // call the fn = pass a stream through the pipe
//   .pipe(jshint.reporter('default'));
// }) // name of the task = plugin name from package.json - need to be required here

gulp.task('default', ['pug', 'watch']); // by default call tasks from array
