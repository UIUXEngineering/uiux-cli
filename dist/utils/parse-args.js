"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getProcessArgsObject() {
    var argList = process.argv;
    var arg = {};
    var a = 0;
    var opt = null;
    var thisOpt = null;
    var curOpt = null;
    for (a; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');
        if (opt === thisOpt) {
            // argument value
            if (curOpt) {
                arg[curOpt] = opt;
            }
            curOpt = null;
        }
        else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;
}
exports.getProcessArgsObject = getProcessArgsObject;
function getArgsArray() {
    var argList = process.argv;
    return argList;
}
exports.getArgsArray = getArgsArray;
