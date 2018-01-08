"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var chalk_1 = require("chalk");
var path_1 = require("path");
var sequence_task_1 = require("../utils/sequence-task");
var rmfr = require("rmfr");
var gulp = require('gulp');
function copySetTask(copySet, cliTasks) {
    console.log(chalk_1.yellow("Running Copy Set: " + copySet.id + " \n"));
    // Create files paths for gulp
    var srcFileKeys = Object.keys(copySet.srcFiles);
    // "design/icons/views"
    var filePaths = srcFileKeys.reduce(function (acc, _srcFilePath) {
        console.log(chalk_1.yellow("    src: " + _srcFilePath));
        var _files = copySet.srcFiles[_srcFilePath].reduce(function (_acc, _fileName) {
            var _path = path_1.normalize(path_1.join(cliTasks.relativeToProjectRoot, _srcFilePath, _fileName));
            console.log(chalk_1.green("    includes: " + path_1.join(_srcFilePath, _fileName)));
            _acc.push(_path);
            return _acc;
        }, []);
        acc = acc.concat(_files);
        return acc;
    }, []);
    console.log(chalk_1.yellow("    dest: " + copySet.outDir));
    console.log('\n');
    gulp_1.task(":copy:" + copySet.id, function (done) {
        var stream = gulp_1.src(filePaths)
            .pipe(gulp_1.dest(path_1.join(cliTasks.relativeToProjectRoot, copySet.outDir)));
        stream.on('end', function (error) {
            console.log(chalk_1.magenta("    finished: " + copySet.outDir));
            if (error) {
                done(error);
            }
            else {
                done();
            }
        });
    });
    gulp_1.task(":clean:" + copySet.id, function (done) {
        var dest = path_1.join(cliTasks.relativeToProjectRoot, copySet.outDir);
        Promise.all([
            rmfr(dest, { glob: true })
        ])
            .then(function () {
            console.log(chalk_1.magenta("    clean: " + copySet.outDir));
            done();
        }).catch(function () {
            done();
            console.log('fail to clean.env');
        });
    });
    gulp_1.task('copy', sequence_task_1.sequenceTask(":clean:" + copySet.id, ":copy:" + copySet.id));
    gulp.start('copy');
}
exports.copySetTask = copySetTask;
