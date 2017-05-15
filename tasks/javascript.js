import gulp from "gulp";
import buffer from "vinyl-buffer";
import insert from "gulp-insert";
import source from "vinyl-source-stream";
import uglify from "gulp-uglify";
import babelify from "babelify";
import browserify from "browserify";
import packageJSON from "../package.json";

gulp.task("javascript", () => {
  return browserify("application/application.js")
    .transform(babelify, { presets: ["es2015"] })
    .bundle()
    .pipe(source("script.cocoascript"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(insert.prepend("var Sketch = this;"))
    .pipe(gulp.dest(`build/Fadeaway-${packageJSON.version}.sketchplugin/Contents/Sketch`));
});
