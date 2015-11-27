var gulp = require('gulp');
var babel = require('gulp-babel');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''].join('\n');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var pkg = require('./package.json');
var run = require('gulp-run');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Develop build
// ============================================================================
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(rename('elasticslider.css'))
        .pipe(gulp.dest('src/css'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src([
            'src/js/react-elasticslider.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(concat('react-elasticslider.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/'));
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['js']);
});

gulp.task('connect', function() {
    connect.server({
        port: 5000,
        root: './src',
        livereload: true
    });
});

// Dist build
// ============================================================================
// gulp.task('dist:clean', function (cb) {
//     return del(['dist', 'temp'], cb);
// });
//
// gulp.task('dist:copyJs', ['dist:clean'], function () {
//     return gulp.src('src/react-elasticslider.js')
//         .pipe(gulp.dest('temp'))
// });
//
// gulp.task('dist:copyView', ['dist:clean'], function () {
//     var TEMPLATE_HEADER = 'angular.module("ngElasticSlider")';
//     TEMPLATE_HEADER += '.run(["$templateCache", function($templateCache) {';
//
//     // Angular $templateCache
//     return gulp.src('src/react-elasticslider.html')
//       .pipe(templateCache({
//           templateHeader: TEMPLATE_HEADER
//       }))
//       .pipe(gulp.dest('temp'));
// });
//
// gulp.task('dist:copyJs', ['dist:clean'], function () {
//     return gulp.src('src/react-elasticslider.js')
//         .pipe(gulp.dest('temp'))
// });
//
// gulp.task('dist:sass', function() {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass({
//             outputStyle: 'compressed'
//         }))
//         .pipe(rename('elasticslider.css'))
//         .pipe(header(banner, { pkg : pkg } ))
//         .pipe(gulp.dest('dist/css'));
// });
//
// gulp.task('dist:build', ['dist:copyJs', 'dist:copyView'], function () {
//     return gulp.src('temp/*.js')
//         .pipe(concat('react-elasticslider.min.js'))
//         .pipe(uglify())
//         .pipe(header(banner, { pkg : pkg } ))
//         .pipe(gulp.dest('dist'))
// });
//
// // Test
// // ============================================================================
// // gulp.task('test:setup', function() {
// //     return run('webdriver-manager update').exec();
// // })
// gulp.task('test:build', function () {
//     return gulp.src(['./src/test/*.js'])
//         .pipe(protractor({
//             configFile: './protractor.conf.js',
//             args: ['--baseUrl', 'http://127.0.0.1:5000']
//         }))
//         .on('error', function(e) { throw e })
// });

// Tasks
// ============================================================================
gulp.task('serve', ['sass', 'js', 'connect', 'watch']);
// gulp.task('test', ['sass', 'js', 'connect', 'test:build']);
// gulp.task('default', ['dist:build', 'dist:sass'], function(cb) {
//     return del(['temp'], cb);
// });
