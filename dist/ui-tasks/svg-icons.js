"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var gulp_1 = require("gulp");
var path_1 = require("path");
var gulpCheerio = require('gulp-cheerio');
var gulpMdSvgstore = require('gulp-md-svgstore');
var gulp = require('gulp');
function processIconSet(iconSet, cliTasks) {
    console.log('\n');
    console.log(chalk_1.yellow("    set: " + (path_1.join(iconSet.outDir, iconSet.setName) + "-" + iconSet.version + ".svg")));
    // Create files paths for gulp
    var iconTree = {};
    var srcPaths = Object.keys(iconSet.srcFiles);
    // "design/icons/views"
    var filePaths = srcPaths.reduce(function (acc, _pathItem) {
        var fileNames = Object.keys(iconSet.srcFiles[_pathItem])
            .reduce(function (_acc, fileName) {
            iconTree[fileName] = iconSet.srcFiles[_pathItem][fileName];
            var _path = path_1.normalize(path_1.join(cliTasks.relativeToProjectRoot, _pathItem, fileName));
            console.log(chalk_1.green("    includes: " + path_1.join(_pathItem, fileName)));
            _acc.push(_path);
            return _acc;
        }, []);
        acc = acc.concat(fileNames);
        return acc;
    }, []);
    gulp_1.task('svg-icons', function (done) {
        var stream = gulp_1.src(filePaths)
            .pipe(gulpCheerio({
            run: function ($, file) {
                var fileConfig = iconTree[file.relative];
                if (fileConfig && fileConfig.id) {
                    $('svg').attr('id', fileConfig.id);
                }
            },
            parserOptions: {
                xmlMode: true
            }
        }))
            .pipe(gulpMdSvgstore({
            // name of result svg
            outputFilename: iconSet.setName + '-' + iconSet.version + '.svg',
            // keep id's set in each file
            keepIds: true,
            // inlineSvg remove xmls meta
            inlineSvg: true
        }))
            .pipe(gulp_1.dest(path_1.join(cliTasks.relativeToProjectRoot, iconSet.outDir)));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + (path_1.join(iconSet.outDir, iconSet.setName) + "-" + iconSet.version + ".svg")));
        });
        stream.on('end', function (error) {
            done(error);
        });
    });
    gulp.start('svg-icons');
}
exports.processIconSet = processIconSet;
