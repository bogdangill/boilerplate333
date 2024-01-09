import gulp from "gulp";

import dartSass from "sass";
import gulpSass from "gulp-sass";
import browsersync from "browser-sync";

const sass = gulpSass(dartSass);

export const styles = () => {
    return gulp.src(`./src/scss/styles.scss`)
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .pipe(gulp.dest(`./build/`))
        .pipe(browsersync.stream());
}