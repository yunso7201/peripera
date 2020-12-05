'use strict';
const gulp = require('gulp');
const browsersync = require('browser-sync').create();//browser-sync 호출
const html = require('gulp-html-tag-include');
const sass = require('gulp-sass');//scss 지원
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const paths = {
    port:'9008',
    input:'./src/**/*',
    output:'./dist/',
    html: {
        input: './src/html/**/**/**',
        output: './dist/html/'
    },
    style:{
        input:'./src/scss/*.scss',
        output:'./dist/css'
    },
    js: {
        input : './src/js/*.js',
        output : './dist/js/'
    },
    font:{
      input:'./src/font/**/*',
      output:'./dist/font'
		},
		img: {
			input: './src/img/**/**',
			output: './dist/img/'
		}
	
};

//browser-sync
function browserSync(done) {
  console.log("start sync...");
  browsersync.init({
    port:paths.port,
    server:{
      baseDir: paths.output
    },
    startPath:'./html/index.html' //index.html 일반 프로젝트에서는 index.html 로 변경
  });
  done();
}

//gulp-html-tag-include
function htmlComp() {
  return gulp.src(paths.html.input)
    .pipe(html())
    .pipe(gulp.dest(paths.html.output))
    .pipe(browsersync.reload({stream:true}));
}

//scss
function sassComp(done) {
  gulp.src(paths.style.input, {sourcemaps: true})
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sass({outputStyle:'expanded'})) //nested, expanded, compact, compressed
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.style.output))
    .pipe(browsersync.reload({stream:true}));
  // 압축버전 - 이버전은 소스맵이 안맞아서 배포용으로 따로 뺌
  gulp.src(paths.style.input, {sourcemaps: true})
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sass({outputStyle:'compressed'})) //nested, expanded, compact, compressed
    .pipe(gulp.dest(paths.style.output+'/min'));
  done();
}

function font() {
  return gulp.src(paths.font.input)
    .pipe(gulp.dest(paths.font.output))
    .pipe(browsersync.reload({stream:true}));
}

function js() {
  return gulp.src(paths.js.input)
    .pipe(gulp.dest(paths.js.output))
    .pipe(uglify())
    .pipe(gulp.dest(paths.js.output+'/min'))
    .pipe(browsersync.reload({stream:true}));
}

function moveImg() {
  return gulp.src(paths.img.input)
    .pipe(gulp.dest(paths.img.output))
    .pipe(browsersync.reload({stream: true}));
}

function watchFiles() {
  gulp.watch(paths.html.input, htmlComp);
  gulp.watch(paths.style.input, sassComp);
  gulp.watch(paths.js.input, js);
  gulp.watch(paths.font.input, font);
}

// export tasks
exports.default = gulp.series(gulp.parallel(htmlComp, sassComp, moveImg, js, font), browserSync, watchFiles);