"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var constants_1 = require("../constants");
var stringUtils = require('ember-cli-string-utils');
var processState = {
    canProcess: false,
};
var cliTasks = {
    relativeToProjectRoot: '',
    svg: {
        tsReference: 'src/environment/svgAssets.ts',
        sets: [],
    },
    copy: {
        sets: [],
    }
};
function getCliTasks() {
    return cliTasks;
}
exports.getCliTasks = getCliTasks;
function parseCLIJson(args) {
    var destProjectRootPath = path_1.relative(args.gulp.cwd, args.processCwd) || '';
    cliTasks.relativeToProjectRoot = path_1.relative(path_1.resolve(__dirname, '../', '../'), destProjectRootPath);
    var cliFile = require(path_1.join(path_1.relative(path_1.resolve(__dirname), destProjectRootPath), constants_1.CONSTANSTS.CLI_NAME));
    if (cliFile['svg']) {
        var svgConfigs = cliFile['svg'];
        svgConfigs.sets.forEach(function (config) {
            cliTasks.svg.sets.push(config);
        });
        cliTasks.svg.tsReference = cliFile.svg.tsReference;
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
