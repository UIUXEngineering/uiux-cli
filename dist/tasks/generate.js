"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var chalk_1 = require("chalk");
gulp_1.task('default', function () {
    console.log();
    console.log('Please specify a gulp task you want to run.');
    console.log("You're probably looking for " + chalk_1.yellow('test') + " or " + chalk_1.yellow('serve:devapp') + ".");
    console.log();
});
