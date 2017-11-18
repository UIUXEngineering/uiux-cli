"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templateTypes;
(function (templateTypes) {
    templateTypes["API_SERVICE"] = "API.SERVICE";
    // ui
    templateTypes["COMPONENT"] = "COMPONENT";
    templateTypes["CDK"] = "CDK";
    templateTypes["MATERIAL"] = "MATERIAL";
    templateTypes["SERVICE"] = "SERVICE";
    templateTypes["COMPONENT_SPEC"] = "COMPONENT.SPEC";
})(templateTypes = exports.templateTypes || (exports.templateTypes = {}));
// **ATTENTION** properties need to match templateTypes
var templatePaths;
(function (templatePaths) {
    templatePaths["COMPONENT"] = "templates/ui/component/base/**/*";
    templatePaths["CDK"] = "templates/ui/cdk/base/**/*";
    templatePaths["CDK_PLATFORM"] = "templates/ui/cdk/platform/**/*";
    templatePaths["CDK_PLATFORM_THEME"] = "templates/ui/cdk/theme/**/*";
    templatePaths["CDK_PLATFORM_MODULE"] = "templates/ui/material/module/**/*";
    templatePaths["MATERIAL"] = "templates/ui/material/base/**/*";
    templatePaths["MATERIAL_PLATFORM"] = "templates/ui/material/platform/**/*";
    templatePaths["MATERIAL_PLATFORM_THEME"] = "templates/ui/material/componentTheme/**/*";
    templatePaths["MATERIAL_PLATFORM_MODULE"] = "templates/ui/material/module/**/*";
})(templatePaths = exports.templatePaths || (exports.templatePaths = {}));
var gulpTasks;
(function (gulpTasks) {
    gulpTasks["GENERATE"] = "generate";
})(gulpTasks = exports.gulpTasks || (exports.gulpTasks = {}));
