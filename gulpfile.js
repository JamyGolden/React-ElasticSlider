'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('gulp-browserify');

const pkg = require('./package.json');
const banner = `/**
 * ${ pkg.name } - ${ pkg.description }
 * @version v${ pkg.version }
 * @link ${ pkg.homepage }
 * @license ${ pkg.license }
*/
`;

// Develop build
// ============================================================================
gulp.task('buildSass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', _handleError)
        .pipe(sourcemaps.write())
        .pipe(rename('react-elasticslider.min.css'))
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('buildHTML', function() {
    return gulp.src('src/demo/index.html')
        .pipe(gulp.dest('build'))
        .pipe(connect.reload());
});

gulp.task('buildJS', function () {
    return gulp.src('src/demo/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015'],
            plugins: ['transform-es2015-modules-commonjs'],
        }))
        .pipe(browserify({
            debug : true,
        }))
        .pipe(concat('react-elasticslider-demo.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['buildSass']);
    gulp.watch('src/js/*.js', ['js', 'buildJS']);
    gulp.watch('src/demo/*.js', ['buildJS']);
    gulp.watch('src/demo/index.js', ['buildHTML']);
});

gulp.task('connect', function() {
    connect.server({
        port: 5000,
        root: './build',
        livereload: true
    });
});

// Dist Dist
// ============================================================================
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename('react-elasticslider.min.css'))
        .pipe(gulp.dest('dist'))
        .pipe(header(banner, {pkg: pkg})) // header gives error in chain
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015'],
            plugins: ['transform-es2015-modules-commonjs'],
        }))
        .pipe(uglify())
        .pipe(concat('react-elasticslider.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
        .pipe(header(banner, { pkg : pkg } )) // header gives error in chain
        .pipe(gulp.dest('dist'));
});

// Tasks
// ============================================================================
gulp.task('serve', [
    'js',
    'buildJS',
    'buildHTML',
    'buildSass',
    'connect',
    'watch'
]);

gulp.task('dist', [
    'sass',
    'js'
]);

// Functions
// ============================================================================
function _handleError(err) {
    console.log(err);
    this.emit('end');
}
