import gulp from "gulp";
import nunjucksRender from "gulp-nunjucks-render";
import data from "gulp-data";
import * as fs from "node:fs";

export const html = () => {
    return gulp.src("./src/html/index.html")
        // добавление текстов из json словаря
        .pipe(data(function() {
            return JSON.parse(fs.readFileSync('./src/data/data.ru.json'))
        }))
        .pipe(nunjucksRender({
            path: ["src/html/components/"] //можно и просто строку
        }))
        .pipe(gulp.dest("./build/"))
}
