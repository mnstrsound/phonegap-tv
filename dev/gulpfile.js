'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var data = require('./data.json');
var buildDir = '../www/';

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat('build.css'))
        .pipe(gulp.dest(buildDir + 'css'));
});

gulp.task('moveLibs', function () {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(buildDir + 'js'));
});

gulp.task('moveJS', function () {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest(buildDir + 'js'));
});

gulp.task('moveImg', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest(buildDir + 'img'));
});

gulp.task('jade', function() {
    gulp.src('jade/**/*.jade')
        .pipe(jade({
            //pretty: true,
            data: data
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('build', ['moveLibs', 'moveJS', 'moveImg','sass', 'jade']);

gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch(['js/**/*.js'], ['moveJS']);
    gulp.watch('img/**/*', ['moveImg']);
    gulp.watch('jade/**/*.jade', ['jade']);
});