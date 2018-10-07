"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var constants_1 = require("./constants");
require("./ui-tasks/generate");
var svg_icons_1 = require("./ui-tasks/svg-icons");
/**
 * This file is only for scaffolding to place
 * conditions if you do not want to directly
 * run a gulp task. For example, if you want
 * to run node or bash files directly.
 */
var parse_args_1 = require("./utils/parse-args");
var parse_cli_json_1 = require("./utils/parse-cli-json");
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
    var cliTasks = parse_cli_json_1.parseCLIJson(args);
    var filePath_1;
    if (state.template) {
        gulp.start(args.gulp.task);
    }
    if (state.svg) {
        // process apps
        cliTasks.svg.forEach(function (svg) {
            var content = constants_1.CONSTANSTS.GENERATE_MSG + '\n';
            content += '// Paths are relative to root app directory where index.html is served.\n';
            content += 'export const svgAssets: any = {\n';
            // process sets
            svg.sets.forEach(function (svgSet) {
                var pathFromHTML = path_1.normalize(path_1.join(svgSet.pathFromHTML, svgSet.setName)) + '-' + svgSet.version + '.svg';
                var propAndValue = '  ' +
                    stringUtils.underscore(svgSet.setName).toUpperCase() +
                    // ': \'' + pathFromHTML.split('/').slice(1).join('/') +
                    ': \'' + pathFromHTML +
                    '\',\n';
                propAndValue = propAndValue.replace('\/\/', '\/');
                content += propAndValue;
                svg_icons_1.processIconSet(JSON.parse(JSON.stringify(svgSet)), svg);
            });
            content += '};\n';
            filePath_1 = path_1.join(svg.relativeToProjectRoot, svg.tsReference);
            mkdirp(path_1.dirname(filePath_1), function (err) {
                if (err) {
                    console.error(err);
                }
                else {
                    fs_1.writeFile(filePath_1, content, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('\n');
                        console.log(chalk_1.yellow("    reference: " + svg.tsReference));
                        console.log('\n');
                    });
                }
            });
        });
    }
}
