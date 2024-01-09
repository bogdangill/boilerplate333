import browsersync from "browser-sync";

export const devserver = (done) => {
    browsersync.init({
        server: {
            baseDir: `./build`,
            notify: false,
            port: 3000,
        }
    })
}