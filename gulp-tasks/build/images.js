import gulp from "gulp";
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
    return gulp.src(`./src/img/**/*.+(png|jpg|gif|ico|svg|webp)`)
        .pipe(webp({
            quality: 70
        }))
        .pipe(gulp.dest(`./build/img/`))
        .pipe(gulp.src(`./src/img/**/*.+(png|jpg|gif|ico|svg|webp)`))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 
        }))
        .pipe(gulp.dest(`./build/img/`))
}