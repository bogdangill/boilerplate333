import gulp from "gulp";
import webpackStream from "webpack-stream";
import browsersync from "browser-sync";

export const scripts = () => {
    return gulp.src(`./src/js/scripts.js`, { sourcemaps: true })
        .pipe(webpackStream({
            mode: "development",
            output: {
                filename: "scripts.min.js"
            }
        }))
        .pipe(gulp.dest(`./build/`))
        .pipe(browsersync.stream());
}