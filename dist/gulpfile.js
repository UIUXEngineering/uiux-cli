"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parse_args_1 = require("./utils/parse-args");
var enums_1 = require("./ui-tasks/enums");
require("./ui-tasks/generate");
var gulp = require('gulp');
var args = parse_args_1.getArgs();
if (args.g) {
    switch (args.template) {
        case enums_1.generateUI.COMPONENT:
            gulp.start(enums_1.generateUI.COMPONENT);
            break;
        case enums_1.generateUI.CDK:
            gulp.start(enums_1.generateUI.CDK);
            break;
    }
}
