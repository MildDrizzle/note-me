var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
    return gulp.src('./test/*.js', { read: false })
      .pipe(mocha({
        reporter: 'spec',
        globals: {
          chai: require('chai')
        }
      }));
});

gulp.task('watch', function() {
  gulp.watch(['./test/*.js'], ['test']);
});

gulp.task('default', ['watch']);
