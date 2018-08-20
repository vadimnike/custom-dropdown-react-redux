'use strict';

var gulp = require('gulp');

// js variables
var concat  = require('gulp-concat');
var watch   = require('gulp-watch');
var iconfont = require('gulp-iconfont');
var iconfontTemplate = require('gulp-iconfont-template');
var iconfontCss = require('gulp-iconfont-css');

// scss variables
var sass = require('gulp-sass');

// postcss variables
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var cssnano      = require('gulp-cssnano');

var paths = {
  css      : ['./markup/css/**/*.css'],
  scss     : ['./markup/scss/**/*.scss']
};


var font = {
  fontName: 'iconFont',
  template: './markup/templates/iconFontTemplate.scss',
  fontPath: '../fonts/icon-font/',
  targetPath: '../../scss/layouts/_icon.scss'
};

gulp.task('iconfont', function(){
  return gulp.src(['./markup/img/svg-icons/*.svg'])
    .pipe(iconfontTemplate({
      fontName: font.fontName,
      path: './markup/templates/fontMapTemplate.html',
      fontPath: font.fontPath,
      targetPath: '../../html/template.html',
      cssClass: 'ic'
    }))
    .on('finish', function(){
      console.log('=========================');
      console.log('FINISH: generate FONT MAP is complete');
      console.log('=========================');
    })
    .on('error', function(){
      console.log('=========================');
      console.log('ERROR: Cant generate FONT MAP');
      console.log('=========================');
    })
    .pipe(iconfontCss({
      fontName: font.fontName,
      path: font.template,
      targetPath: font.targetPath,
      fontPath: font.fontPath,
      cssClass: 'ic'
    }))
    .on('error', function(e){
      console.log('=========================');
      console.log('ERROR: Cant generate SCSS styles');
      console.log('=========================');
    })
    .on('finish', function(e){
      console.log('=========================');
      console.log('FINISH: generate SCSS styles is complete');
      console.log('=========================');
    })
    .pipe(iconfont({
      fontName: font.fontName,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      normalize:true,
      fontHeight: 1001
    })).on('finish', function(e){
      console.log('=========================');
      console.log('FINISH: generate SVG to font is complete');
      console.log('=========================');
    })
    .on('error', function(){
      console.log('=========================');
      console.log('ERROR: Cant generate SVG to font');
      console.log('=========================');
    })
    .pipe(gulp.dest('markup/fonts/icon-font'));
});

gulp.task('scss', function () {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(postcss([autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 5%'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('markup/css'));
});

gulp.task('css:minify', function () {
  return gulp.src(paths.css)
    .pipe(cssnano())
    .pipe(postcss([autoprefixer({ browsers: ['ie >= 10', 'last 4 versions', '> 5%'] }) ]))
    .pipe(gulp.dest('markup/css'));
});

gulp.task('watcher', function () {
  gulp.watch(paths.scss, ['scss']);
});

gulp.task('webserver', function() {
  webserver.server({
    root: './',
    port: 8000
  });
});

gulp.task('build', ['css:minify'], function () {
  console.log('Build success');
});

