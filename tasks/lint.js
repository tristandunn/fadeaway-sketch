import gulp from "gulp";
import eslint from "gulp-eslint";

const sources = [
  "gulpfile.babel.js",
  "application/application.js",
  "tasks/**/*.js"
];

gulp.task("lint", () => {
  return gulp.src(sources)
    .pipe(eslint())
    .pipe(eslint.format());
});
