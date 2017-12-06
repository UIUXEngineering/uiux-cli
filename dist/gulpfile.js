"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This file is only for scaffolding to place
 * conditions if you do not want to directly
 * run a gulp task. For example, if you want
 * to run node or bash files directly.
 */
var parse_args_1 = require("./utils/parse-args");
var parse_cli_json_1 = require("./utils/parse-cli-json");
var svg_icons_1 = require("./ui-tasks/svg-icons");
require("./ui-tasks/generate");
var path_1 = require("path");
var fs_1 = require("fs");
var chalk_1 = require("chalk");
var stringUtils = require('ember-cli-string-utils');
var gulp = require('gulp');
var mkdirp = require('mkdirp');
var state = parse_args_1.parseArgs();
var args = parse_args_1.getArgs();
if (state.canProcess) {
    /**
     * Change process working directory to root directory of cli.
     */
    process.chdir(args.gulp.cwd);
    var cliTasks_1 = parse_cli_json_1.parseCLIJson(args);
    if (state.template) {
        gulp.start(args.gulp.task);
    }
    if (state.svg) {
        var content_1 = '// Paths are relative to root app directory where index.html is served.\n';
        content_1 += 'export const svgIconSets: any = {\n';
        cliTasks_1.svgIcons.sets.forEach(function (iconSet) {
            var filepath = path_1.normalize(path_1.join(iconSet.outDir, iconSet.setName)) + '-' + iconSet.version + '.svg';
            var propAndValue = '  ' + stringUtils.underscore(iconSet.setName).toUpperCase() + ': \'/' + filepath.substr(4) + '\',\n';
            propAndValue = propAndValue.replace('\/\/', '\/');
            content_1 += propAndValue;
            svg_icons_1.processIconSet(JSON.parse(JSON.stringify(iconSet)), cliTasks_1);
        });
        content_1 += '};\n';
        var filePath_1 = path_1.join(cliTasks_1.relativeToProjectRoot, cliTasks_1.svgIcons.tsReference);
        mkdirp(path_1.dirname(filePath_1), function (err) {
            if (err) {
                console.error(err);
            }
            else {
                fs_1.writeFile(filePath_1, content_1, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log('\n');
                    console.log(chalk_1.yellow("    reference: " + filePath_1));
                    console.log('\n');
                });
            }
        });
    }
}
