import gulp from 'gulp'
import minify from 'gulp-minify'
import postcss from 'gulp-postcss'
import plumber from 'gulp-plumber'
import gulpSass from 'gulp-sass'
import darthSass from 'sass'
import sourcemaps from 'gulp-sourcemaps'
import babelify from 'babelify'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import autoprefixer from 'autoprefixer'
import browsersync from 'browser-sync'
import rename from 'gulp-rename'

const sass = gulpSass(darthSass)
const server = browsersync.create()

const path = {
  styles: {
      src: "./dev/scss/styles.scss",
      dest: "./dist/css"
  },

  scripts: {
      src: "./dev/js/scripts.js",
      dest: "./dist/js"
  }
}
/**
 * Compila SASS para desarrollo
 */

 const stylesDev = done => {
  gulp.src(path.styles.src)
      .pipe(plumber())
      .pipe(sass({outputstyle: 'nested' }))
      .pipe(postcss([autoprefixer()]))
      .pipe(gulp.dest(path.styles.dest))
      .pipe(server.stream())
  done()
}

/**
 * Compila SASS para producción
 */

 const styles = done => {
  gulp.src(path.styles.src)
      .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass({outputstyle: 'compressed' }))
      .pipe(postcss([autoprefixer()]))
      .pipe(sourcemaps.write())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(path.styles.dest))
      .pipe(server.stream())
  done()
}


/**
 * Inicia el servidor local cn BrowserSync
 */

 const serverUp = done => {
  server.init({
      server: {
          baseDir: './'
      },
      open: false
  })
  gulp.watch(path.styles.src, styles, server.reload)
  // gulp.watch(path.scripts.src, scripts, server.reload)
  gulp.watch(['./*.html', './**/*.js']).on('change', server.reload)
  done()
}

/**
 * Agrega una task de gulp "Deafult"
 */
gulp.task('default', serverUp)

gulp.task('develop', stylesDev)
