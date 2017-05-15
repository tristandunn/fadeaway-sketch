import gulp from "gulp";
import sequence from "run-sequence";

gulp.task("build", () => {
  return sequence.use(gulp)(
    "clean",
    "copy",
    "javascript",
    "zip"
  );
});
