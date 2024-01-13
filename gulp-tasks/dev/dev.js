import gulp from "gulp";

//импорт задач для разработки
import { copyFonts } from "../common/copyFonts.js";
import { copyFavicons } from "../common/copyFavicons.js";
import { remove } from "../common/remove.js";
import { html } from "./html.js";
import { styles } from "./styles.js";
import { scripts } from "./scripts.js";
import { images } from "./images.js";
import { devserver } from "./devserver.js";
import { makeSprite } from "../common/makeSprite.js";

//наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch("./src/scss/**/*.scss", styles);
    gulp.watch(["./src/html/**/*.html", "./src/data/*.json"], html);
    gulp.watch("./src/js/**/*.js", scripts);
    gulp.watch("./src/img/**/*.{png, jpeg, jpg, webp, svg}", images);
    gulp.watch("./src/icons/*.svg", makeSprite);
}

const mainTasks = gulp.parallel(copyFonts, copyFavicons, html, styles, scripts, images, makeSprite);

//построение сценариев выполнения задач
export const dev = gulp.series(remove, mainTasks, gulp.parallel(watcher, devserver));