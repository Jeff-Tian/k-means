var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sh = require('shelljs');
var karma = require('karma').server;
var bump = require('gulp-bump');
var
    print = require('gulp-print'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    uglifyCss = require('gulp-minify-css'),
    jade = require('gulp-jade')

gulp.task('jshint', function () {
    gulp
        .src(['./www/js/**/*.js', './tests/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
    ;
});

gulp.task('mocha', function (done) {
    sh.exec('mocha', done);
});

gulp.task('start', function (done) {
    sh.exec('node app.js', done);
});

gulp.task('test', function (done) {
    karma.start({
        configFile: __dirname + '/tests/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('bump', function () {
    gulp.src(['./package.json', './bower.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('release', function (done) {
    return runSequence('jshint', 'bump', 'build', done);
});

gulp.task('default', function (done) {
    return runSequence('build', 'start', done);
});

gulp.task('replace', function (done) {
    var replace = require('gulp-replace');

    gulp.src(['public/semantic/dist/semantic.min.css'])
    //.pipe(replace(/https:\/\/fonts.googleapis.com\/css/g, 'http://fonts.useso.com/css'))
        .pipe(replace(/https:\/\/fonts.googleapis.com\/css/g, ''))
        .pipe(gulp.dest('public/semantic/dist/'))
    ;

    done();
});


gulp.task('clean', function (done) {
    return gulp.src('dist', {read: false})
        .pipe(clean())
        ;
});

gulp.task('copy', function (done) {
    return gulp.src(['public/**/*'])
        .pipe(gulp.dest('dist/'))
        ;
});

gulp.task('uglify-js', function (done) {
    return gulp.src('public/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        ;
});

gulp.task('uglify-css', function (done) {
    return gulp.src('public/stylesheets/*.css')
        .pipe(uglifyCss())
        .pipe(gulp.dest('dist/stylesheets'))
        ;
});


gulp.task('jade', function (done) {
    var jadeFiles = [{
        src: './views/index.jade',
        dest: './public/'
    }];

    return jadeFiles.forEach(function (jf) {
        if (!jf.src || !jf.dest) return done();

        gulp.src(jf.src)
            .pipe(jade())
            .pipe(gulp.dest(jf.dest))

        done();
    });
});

gulp.task('build', function (done) {
    runSequence('jshint', 'mocha', 'clean', 'jade', 'copy', 'uglify-js', 'uglify-css', done);
});