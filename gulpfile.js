var gulp     = require("gulp"),
    sass     = require("gulp-sass"),
    hash     = require("gulp-hash"),
    del      = require("del");

var SRCS = {
  sass: 'source/scss/style.scss',
  sassWatch: 'source/scss/*.scss'
}

gulp.task('sass', (done) => {
  gulp.src(SRCS.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('static/css'));
  done();
});

gulp.task('sass-dev', (done) => {
  del(['static/css/style-*.css']);

  gulp.src(SRCS.sass)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(hash())
    .pipe(gulp.dest('static/css'))
    .pipe(hash.manifest('assetHashes.json'))
    .pipe(gulp.dest('data'));
  done();
});

gulp.task('sass:watch', () => {
  gulp.watch(SRCS.sassWatch, gulp.series('sass-dev'));
});

gulp.task('build', gulp.series('sass'));

gulp.task('build-dev', gulp.series('sass-dev'));

gulp.task('default', gulp.series('build-dev', gulp.parallel('sass:watch')));
