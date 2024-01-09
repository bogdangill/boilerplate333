import gulp from "gulp";

export const copyFavicons = () => {
    return gulp.src(`./src/favicons/*.*`)
        .pipe(gulp.dest(`./build/favicons/`))
}