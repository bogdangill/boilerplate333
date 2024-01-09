import gulp from "gulp";

export const copyFonts = () => {
    return gulp.src(`./src/fonts/*.*`)
        .pipe(gulp.dest(`./build/fonts/`))
}