import gulp from "gulp";

import dartSass from "sass";
import gulpSass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import cssnano from "gulp-cssnano";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const styles = () => {
    return gulp.src(`./src/scss/styles.scss`, { sourcemaps: true })
    .pipe(sass())
    .pipe(groupCssMediaQueries())
    .pipe(
        autoPrefixer()
    )
    .pipe(cssnano())
    // .pipe(rev())
    .pipe(gulp.dest(`./build/`))
    // .pipe(rev.manifest({
    //     merge: true
    // }))
    // .pipe(gulp.dest(`./build/`))
}