import gulp from "gulp";
import {dev} from "./gulp-tasks/dev/dev.js";
import {build} from "./gulp-tasks/build/build.js";

if (process.argv.includes('build')) {
    gulp.task('build', build);
} else {
    gulp.task('dev', dev);
}

//выполнение сценария по умолчанию
gulp.task('default', dev);