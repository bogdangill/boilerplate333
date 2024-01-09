import gulp from "gulp";

//импорт задач для билда
import { copyFonts } from "../common/copyFonts.js";
import { copyFavicons } from "../common/copyFavicons.js";
import { remove } from "../common/remove.js";
import { styles } from "./styles.js";
import { scripts } from "./scripts.js";
import { images } from "./images.js";
import { html } from "./html.js";
import { makeSprite } from "../common/makeSprite.js";

const mainTasks = gulp.parallel(copyFonts, copyFavicons, styles, scripts, images, makeSprite);

export const build = gulp.series(remove, mainTasks, html);