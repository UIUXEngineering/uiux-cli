"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
function gulpDest(args) {
    switch (args.template) {
        // ui platform
        case enums_1.templateTypes.MATERIAL:
            return 'src/lib';
        // ui platform
        case enums_1.templateTypes.CDK:
            return 'src/cdk';
        // ui platform
        case enums_1.templateTypes.COMPONENT:
            return 'src/app';
        // ui platform
        case enums_1.templateTypes.SERVICE:
            return 'src/service';
        default:
            return '';
    }
}
exports.gulpDest = gulpDest;
