import gulp from "gulp";
import nunjucksRender from "gulp-nunjucks-render";
import browsersync from "browser-sync";

export const html = () => {
    return gulp.src(`./src/html/index.html`) //для лендинга можно только индекс
        .pipe(nunjucksRender({
            path: ["src/html/components/"] //можно и просто строку
        }))
        .pipe(gulp.dest(`./build/`))
        .pipe(browsersync.stream());
}