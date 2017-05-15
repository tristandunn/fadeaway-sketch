/* global __dirname */

import gulp from "gulp";
import shell from "gulp-shell";
import packageJSON from "../package.json";

gulp.task("zip", () => {
  let source = `${__dirname}/../build`,
      target = `Fadeaway-${packageJSON.version}.sketchplugin.zip`;

  return gulp.src("", { read: false })
    .pipe(shell(
      `cd ${source} && zip -r -y ${target} Fadeaway-${packageJSON.version}.sketchplugin`,
      { quiet: true }
    ));
});
