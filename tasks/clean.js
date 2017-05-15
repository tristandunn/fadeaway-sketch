import del from "del";
import gulp from "gulp";

const sources = [
  "build"
];

gulp.task("clean", () => {
  return del(sources);
});
