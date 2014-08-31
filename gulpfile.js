'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  gulp.src(['gulpfile.js', 'server.js', './lib/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function() {
    return gulp.src('./test/*.js', { read: false })
      .pipe(mocha({
        reporter: 'spec',
        globals: {
          chai: require('chai'),
          expect : require('chai').expect
        }
      }));
});

gulp.task('watch', function() {
  gulp.watch(['./test/*.js', './lib/**/*.js'], ['test']);
});

gulp.task('default', ['watch']);
