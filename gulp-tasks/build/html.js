import gulp from "gulp";
import nunjucksRender from "gulp-nunjucks-render";

export const html = () => {
    return gulp.src("./src/html/index.html")
        .pipe(nunjucksRender({
            path: ["src/html/components/"] //можно и просто строку
        }))
        .pipe(gulp.dest("./build/"))
}
