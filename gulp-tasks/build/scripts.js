import gulp from "gulp";
import webpackStream from "webpack-stream";

export const scripts = () => {
    return gulp.src(`./src/js/scripts.js`, { sourcemaps: false })
        .pipe(webpackStream({
            mode: "production",
            output: {
                filename: "scripts.min.js"
            }
        }))
        // .pipe(rev())
        .pipe(gulp.dest(`./build/`))
        // .pipe(rev.manifest({
        //     merge: true
        // }))
        // .pipe(gulp.dest(`./build/`))
}