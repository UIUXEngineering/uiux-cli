"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var constants_1 = require("../constants");
var cliTasks = {
    svg: [{
            relativeToProjectRoot: '',
            tsReferenceFilePath: '',
            sets: [],
        }],
    copy: {
        sets: [],
    }
};
function parseCLIJson(args) {
    var destProjectRootPath = path_1.relative(args.gulp.cwd, args.processCwd) || '';
    var relativeToProjectRoot = path_1.relative(path_1.resolve(__dirname, '../', '../'), destProjectRootPath);
    var cliFile = require(path_1.join(path_1.relative(path_1.resolve(__dirname), destProjectRootPath), constants_1.CONSTANSTS.CLI_NAME));
    if (cliFile['svg']) {
        var svgConfigs_1 = cliFile['svg'];
        svgConfigs_1.forEach(function (svgConfig, index) {
            svgConfig.sets.forEach(function (_config) {
                cliTasks.svg[index].sets.push(_config);
                cliTasks.svg[index].relativeToProjectRoot = relativeToProjectRoot;
                cliTasks.svg[index].tsReferenceFilePath = svgConfigs_1[index].tsReferenceFilePath;
            });
        });
    }
    if (cliFile['copy']) {
        var svgConfigs = cliFile['copy'];
        var copyItems_1 = args.gulp.copyItems || [];
        svgConfigs.sets.forEach(function (config) {
            if (config.id) {
                if (copyItems_1 && copyItems_1.length) {
                    if (copyItems_1.indexOf(config.id) !== -1) {
                        cliTasks.copy.sets.push(config);
                    }
                }
                else {
                    cliTasks.copy.sets.push(config);
                }
            }
            else {
                cliTasks.copy.sets.push(config);
            }
        });
    }
    return cliTasks;
}
exports.parseCLIJson = parseCLIJson;
