import gulp from "gulp";
import sequence from "run-sequence";

gulp.task("release:production", (callback) => {
  return sequence.use(gulp)(
    "build",
    "upload",
    callback
  );
});
