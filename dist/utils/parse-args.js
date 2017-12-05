"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var enums_1 = require("./enums");
var gulpPaths_1 = require("./gulp/gulpPaths");
var templateVars_1 = require("./template/templateVars");
var path_1 = require("path");
var stringUtils = require('ember-cli-string-utils');
var processState = {
    canProcess: false,
    template: false,
    svg: false,
};
var args = {
    template: '',
    templateVars: {},
    gulp: {
        task: '',
        srcBase: '',
        srcPlatform: '',
        srcModule: '',
        srcTheme: '',
        srcSpec: '',
        cwd: '',
        dest: '',
        renameBase: {
            basename: '',
        },
        renameSpec: {
            basename: '',
        },
        renameModule: {
            basename: '',
        },
        renameTheme: {
            basename: '',
        },
    },
};
function getArgs() {
    return args;
}
exports.getArgs = getArgs;
function parseArgs() {
    var argList = process.argv;
    if (argList) {
        if (argList.indexOf('--version') !== -1) {
            var pkg = require('../../package.json');
            console.log(pkg.version);
        }
        else if (argList.indexOf('g') !== -1 || argList.indexOf('generate') !== -1) {
            processState.canProcess = true;
            processState.template = true;
            parseTemplateParams(argList);
        }
        else if (argList.indexOf('svg') !== -1) {
            processState.canProcess = true;
            processState.svg = true;
            args.gulp.cwd = path_1.resolve(__dirname, '../', '../');
            args.gulp.task = 'svg-icons';
        }
        else {
            console.error("" + chalk_1.bold(chalk_1.red('No Params Provided')));
        }
    }
    return processState;
}
exports.parseArgs = parseArgs;
function parseTemplateParams(argList) {
    var index = argList.indexOf('g') || argList.indexOf('generate');
    // get rest of arg list after 'g' or 'generage'
    var opts = argList.slice(index);
    if (!opts[1]) {
        console.error("" + chalk_1.bold(chalk_1.red('Template type not Provided')));
        return;
    }
    if (!opts[2]) {
        // TODO tell which type of template name is not provided
        console.error("" + chalk_1.bold(chalk_1.red('Template name not Provided')));
        return;
    }
    // Template Variables
    // templateTypes enum
    args.template = opts[1].toUpperCase();
    args.gulp = gulpPaths_1.gulpPaths(args, opts);
    // GULP TASK
    // GULP TASK
    // GULP TASK
    args.gulp.task = enums_1.gulpTasks.GENERATE;
    args = templateVars_1.templateVars(args, opts);
}
