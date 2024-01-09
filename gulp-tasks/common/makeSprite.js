import gulp from "gulp";
import svg_sprite from "gulp-svg-sprite";

export const makeSprite = () => {
    return gulp.src(`./src/icons/*.svg`)
        .pipe(svg_sprite({
            mode: {
                stack: {
                    sprite: '../icons/sprite.svg', //имя файла спрайта
                    example: false
                }
            }
        }))
        .pipe(gulp.dest(`./build/img/`))
}