"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../enums");
function gulpDest(args) {
    switch (args.template) {
        // ui platform
        case enums_1.templateTypes.MATERIAL:
            return 'src/ui-lib';
        // ui platform
        case enums_1.templateTypes.CDK:
            return 'src/ui-cdk';
        // ui platform
        case enums_1.templateTypes.COMPONENT:
            return 'src/ui-app';
        // ui platform
        case enums_1.templateTypes.SERVICE:
            return 'src/ui-service';
        default:
            return '';
    }
}
exports.gulpDest = gulpDest;
