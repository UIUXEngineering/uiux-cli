"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var gulp_1 = require("gulp");
var enums_1 = require("../utils/enums");
var parse_args_1 = require("../utils/parse-args");
var sequence_task_1 = require("../utils/sequence-task");
var data = require('gulp-data');
var gulpTemplate = require('gulp-template');
var gulpRename = require('gulp-rename');
gulp_1.task(':ui-base', function (done) {
    var args = parse_args_1.getArgs();
    var stream = gulp_1.src(args.gulp.srcBase)
        .pipe(data(function () { return (args.templateVars); }))
        .pipe(gulpTemplate())
        .pipe(gulpRename(args.gulp.renameBase))
        .pipe(gulp_1.dest(args.gulp.dest));
    stream.on('end', function () {
        console.log(chalk_1.magenta("    finished: " + args.gulp.dest));
    });
    stream.on('end', function (error) {
        done(error);
    });
});
gulp_1.task(':ui-platform', function (done) {
    var args = parse_args_1.getArgs();
    if (args.gulp.srcPlatform) {
        var stream = gulp_1.src(args.gulp.srcPlatform)
            .pipe(data(function () { return (args.templateVars); }))
            .pipe(gulpTemplate())
            .pipe(gulp_1.dest(args.gulp.dest));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + args.gulp.dest));
        });
        stream.on('end', function (error) {
            done(error);
        });
    }
    else {
        done();
    }
});
gulp_1.task(':ui-module', function (done) {
    var args = parse_args_1.getArgs();
    if (args.gulp.srcModule) {
        var stream = gulp_1.src(args.gulp.srcModule)
            .pipe(data(function () { return (args.templateVars); }))
            .pipe(gulpTemplate())
            .pipe(gulpRename(args.gulp.renameModule))
            .pipe(gulp_1.dest(args.gulp.dest));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + args.gulp.dest));
        });
        stream.on('end', function (error) {
            done(error);
        });
    }
    else {
        done();
    }
});
gulp_1.task(':ui-theme', function (done) {
    var args = parse_args_1.getArgs();
    if (args.gulp.srcTheme) {
        var stream = gulp_1.src(args.gulp.srcTheme)
            .pipe(data(function () { return (args.templateVars); }))
            .pipe(gulpTemplate())
            .pipe(gulpRename(args.gulp.renameTheme))
            .pipe(gulp_1.dest(args.gulp.dest));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + args.gulp.dest));
        });
        stream.on('end', function (error) {
            done(error);
        });
    }
    else {
        done();
    }
});
gulp_1.task(':ui-spec', function (done) {
    var args = parse_args_1.getArgs();
    if (args.gulp.srcSpec) {
        var stream = gulp_1.src(args.gulp.srcSpec)
            .pipe(data(function () { return (args.templateVars); }))
            .pipe(gulpTemplate())
            .pipe(gulpRename(args.gulp.renameSpec))
            .pipe(gulp_1.dest(args.gulp.dest));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + args.gulp.dest));
        });
        stream.on('end', function (error) {
            done(error);
        });
    }
    else {
        done();
    }
});
// *.toString() is to just make typescript compiler happy.
gulp_1.task(enums_1.gulpTasks.GENERATE, sequence_task_1.sequenceTask(':ui-base', ':ui-platform', ':ui-module', ':ui-theme', ':ui-spec'));
