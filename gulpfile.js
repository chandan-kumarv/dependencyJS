let gulp = require("gulp");
let ts = require("gulp-typescript");
let tsProject = ts.createProject("tsconfig.json");
let sourcemaps = require('gulp-sourcemaps');
let merge = require('merge2');
let compile = [
  'index.ts',
  './src/**/*.ts',
  './test/**/*.ts',
  './src/**/*Spec.ts',
  '!./src/**/trash/**'
];

gulp.task("tsc", function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('.'));
});
gulp.task("ts", function () {
  let tsResult = gulp.src(compile, {base: '.'})
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .once("error", function () {
      this.once("finish", function () {
        process.exit(1);
      });
    });

  return merge([
    tsResult.dts.pipe(gulp.dest('.')),
    tsResult.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('.')),
    tsResult.pipe(sourcemaps.write('.'))
  ]);
});