import gulp from "gulp";
import packageJSON from "../package.json";

const sources = [
  "application/manifest.json"
];

gulp.task("copy", () => {
  return gulp.src(sources, { base: "application" })
    .pipe(gulp.dest(`build/Fadeaway-${packageJSON.version}.sketchplugin/Contents/Sketch`));
});
