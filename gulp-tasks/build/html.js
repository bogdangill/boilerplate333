import gulp from "gulp";
import nunjucksRender from "gulp-nunjucks-render";

export const html = () => {
    return gulp.src("./src/index.html")
        .pipe(nunjucksRender({
            path: ["src/components/"] //можно и просто строку
        }))
        .pipe(gulp.dest("./build/"))
}
