"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var chalk_1 = require("chalk");
var path_1 = require("path");
var gulp = require('gulp');
function copySet(copySet, cliTasks) {
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
    gulp_1.task('copy', function () {
        return gulp_1.src(filePaths)
            .pipe(gulp_1.dest(path_1.join(cliTasks.relativeToProjectRoot, copySet.outDir)));
    });
    gulp.start('copy');
}
exports.copySet = copySet;
