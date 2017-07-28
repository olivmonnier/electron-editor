const gulp = require('gulp');
const sass = require('gulp-sass');

const processManager = require('electron-connect').server.create();

gulp.task('fonts', () => {
  gulp.src([
    './node_modules/photon/fonts/**/*'
  ]).pipe(gulp.dest('./src/fonts'))
});

gulp.task('sass', () => {
  gulp.watch([
    './src/sass/**/*.scss'
  ], () => {
    gulp.src('./src/sass/main.scss')
      .pipe(sass({
        precision: 10
      }).on('error', sass.logError))
      .pipe(gulp.dest('./src/css'))
  })
});

gulp.task('default', ['fonts', 'sass'], () => {
  processManager.start()
  // Restart browser process
  gulp.watch([
    './src/main.js',
    './src/main-process/**/*.js'
  ], () => {
    processManager.broadcast('close')
    processManager.restart()
  })
  // Reload renderer process
  gulp.watch([
    './src/renderer-process/**/*.js',
    './src/windows/**/*.html',
    './src/**/*.{css,js}'
  ], processManager.reload)
});