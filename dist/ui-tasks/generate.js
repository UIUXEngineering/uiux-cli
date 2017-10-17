"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var enums_1 = require("./enums");
var chalk_1 = require("chalk");
var parse_args_1 = require("../utils/parse-args");
gulp_1.task(enums_1.generateUI.COMPONENT, function () {
    console.log('COMPONENT');
    console.log(parse_args_1.getArgs());
    console.log();
    console.log('Please specify a gulp task you want to run.');
    console.log("You're probably looking for " + chalk_1.yellow('test') + " or " + chalk_1.yellow('serve:devapp') + ".");
    console.log();
});
gulp_1.task(enums_1.generateUI.CDK, function () {
    console.log('CDK');
    console.log(parse_args_1.getArgs());
    console.log();
    console.log('Please specify a gulp task you want to run.');
    console.log("You're probably looking for " + chalk_1.yellow('test') + " or " + chalk_1.yellow('serve:devapp') + ".");
    console.log();
});
