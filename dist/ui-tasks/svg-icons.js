"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var gulp_1 = require("gulp");
// import * as gulp from 'gulp';
var path_1 = require("path");
var gulpCheerio = require('gulp-cheerio');
var gulpMdSvgstore = require('gulp-md-svgstore');
function processIconSet(iconSet, cliTasks) {
    console.log('\n');
    console.log(chalk_1.yellow("    set: " + (path_1.join(iconSet.outDir, iconSet.setName) +
        "-" + iconSet.version + ".svg")));
    // Create files paths for gulp
    var iconTree = {};
    var srcPaths = Object.keys(iconSet.srcFiles);
    // "design/icons/views"
    var filePaths = srcPaths.reduce(function (acc, _pathItem) {
        var fileNames = Object.keys(iconSet.srcFiles[_pathItem])
            .reduce(function (_acc, fileName) {
            iconTree[fileName] = iconSet.srcFiles[_pathItem][fileName];
            var _path = path_1.normalize(path_1.join(cliTasks.relativeToProjectRoot, _pathItem, fileName));
            var fileExists = fs_1.existsSync(_path);
            if (fileExists) {
                console.log(chalk_1.green("    includes: " + path_1.join(_pathItem, fileName)));
                _acc.push(_path);
                return _acc;
            }
            else {
                console.log(chalk_1.red("    missing ( not included ): " + path_1.join(_pathItem, fileName)));
                return _acc;
            }
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
                xmlMode: true,
            },
        }))
            .pipe(gulpMdSvgstore({
            // name of result svg
            outputFilename: iconSet.setName + '-' + iconSet.version + '.svg',
            // keep id's set in each file
            keepIds: true,
            // inlineSvg remove xmls meta
            inlineSvg: true,
        }))
            .pipe(gulp_1.dest(path_1.join(cliTasks.relativeToProjectRoot, iconSet.outDir)));
        stream.on('end', function () {
            console.log(chalk_1.magenta("    finished: " + (path_1.join(iconSet.outDir, iconSet.setName) +
                "-" + iconSet.version + ".svg")));
        });
        stream.on('end', function (error) {
            done(error);
        });
    });
    gulp_1.task('ts-sprite', gulp_1.series('svg-icons', function (done) {
        var sourceSVGFileName = iconSet.setName + '-' + iconSet.version + '.svg';
        var sourcePath = path_1.join(cliTasks.relativeToProjectRoot, iconSet.outDir, sourceSVGFileName);
        var destTSFile = path_1.join(cliTasks.relativeToProjectRoot, iconSet.tsSpriteFilePath);
        fs_1.readFile(sourcePath, function (err, data) {
            if (err) {
                throw err;
            }
            var payload = '//tslint:disable \nexport const SVG_SPRITE: any = `' + data + '`;';
            fs_1.writeFile(destTSFile, payload, 'utf8', function () {
                console.log(chalk_1.magenta("    TypeScript Sprite: " + destTSFile));
                done();
            });
        });
    }));
    if (iconSet.tsSpriteFilePath && iconSet.tsSpriteFilePath.length > 0) {
        gulp_1.task('ts-sprite')(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
    else {
        gulp_1.task('svg-icons')(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
}
exports.processIconSet = processIconSet;
