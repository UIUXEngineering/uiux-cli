"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var gulpDest_1 = require("./gulpDest");
var enums_1 = require("../enums");
var gulpSrc_1 = require("./gulpSrc");
var stringUtils = require('ember-cli-string-utils');
function gulpPaths(_args, opts) {
    var gulpParams = {
        srcBase: '',
        srcPlatform: '',
        srcModule: '',
        srcTheme: '',
        srcSpec: '',
        cwd: '',
        dest: '',
        renameBase: {
            basename: '',
            suffix: '',
        },
        renameSpec: {
            basename: '',
            suffix: '',
        },
        renameModule: {
            basename: '',
            suffix: '',
        },
        renameTheme: {
            basename: '',
            suffix: '',
        },
    };
    // Base File Name
    gulpParams.renameBase.basename = stringUtils.dasherize(opts[2]);
    gulpParams.renameSpec.basename = stringUtils.dasherize(opts[2]);
    gulpParams.renameModule.basename = stringUtils.dasherize(opts[2]);
    gulpParams.renameTheme.basename = '_' + stringUtils.dasherize(opts[2]);
    // concat instead of using gulp-template
    // 'suffix'
    gulpParams.renameModule.suffix = '.module';
    gulpParams.renameTheme.suffix = '.theme';
    if (_args.template === enums_1.templateTypes.MATERIAL || _args.template === enums_1.templateTypes.COMPONENT) {
        gulpParams.renameBase.suffix = '.component';
        gulpParams.renameSpec.suffix = '.component.spec';
    }
    if (_args.template === enums_1.templateTypes.CDK || _args.template === enums_1.templateTypes.SERVICE) {
        gulpParams.renameSpec.suffix = '.spec';
    }
    // GULP SRC
    // GULP SRC
    // GULP SRC
    var sources = gulpSrc_1.gulpSrc(_args.template);
    gulpParams.srcBase = sources.srcBase;
    gulpParams.srcPlatform = sources.srcPlatform;
    gulpParams.srcModule = sources.srcModule;
    gulpParams.srcTheme = sources.srcTheme;
    gulpParams.srcSpec = sources.srcSpec;
    // GULP CWD
    // GULP CWD
    // GULP CWD
    /**
     * gulpParams.cwd = Root directory of cli.
     */
    gulpParams.cwd = path_1.resolve(__dirname, '../', '../', '../');
    // GULP DEST
    // GULP DEST
    // GULP DEST
    var destProjectRootPath = path_1.relative(gulpParams.cwd, process.cwd());
    var destRelativeToProjectPath = '';
    // if path provided
    if (opts[3]) {
        /**
         * Change name from camel case to dash case.
         * @type {string}
         */
        destRelativeToProjectPath = opts[3] + '/' + stringUtils.dasherize(opts[2]);
    }
    else {
        /**
         * Change name from camel case to dash case.
         * @type {string}
         */
        destRelativeToProjectPath = stringUtils.dasherize(opts[2]);
    }
    gulpParams.dest = path_1.join(destProjectRootPath, gulpDest_1.gulpDest(_args), destRelativeToProjectPath);
    return gulpParams;
}
exports.gulpPaths = gulpPaths;
