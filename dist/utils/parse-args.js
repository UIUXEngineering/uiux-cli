"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var args = {
    g: false,
    template: null,
    path: null,
};
function getArgs() {
    return args;
}
exports.getArgs = getArgs;
function getArgsArray() {
    var argList = process.argv;
    if (argList) {
        if (argList.indexOf('--version') !== -1) {
            var pkg = require('../../package.json');
            console.log(pkg.version);
        }
        else if (argList.indexOf('g') === -1) {
            console.log("" + chalk_1.red('No Params Provided'));
        }
        else {
            parseArgs(argList);
        }
    }
}
exports.getArgsArray = getArgsArray;
function parseArgs(argList) {
    var opts = argList.slice(argList.indexOf('g'));
    args.g = true;
    args.template = opts[1].toUpperCase();
    args.path = opts[2].toUpperCase();
}
