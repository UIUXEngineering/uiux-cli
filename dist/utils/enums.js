"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var templateTypes = {
    API_SERVICE: 'API.SERVICE',
    // ui
    CDK: 'CDK',
    COMPONENT: 'COMPONENT',
    COMPONENT_SPEC: 'COMPONENT.SPEC',
    MATERIAL: 'MATERIAL',
    SERVICE: 'SERVICE',
};
exports.templateTypes = templateTypes;
// **ATTENTION** properties need to match templateTypes
var templatePaths = {
    COMPONENT: 'templates/ui/component/base/**/*',
    COMPONENT_PLATFORM: 'templates/ui/component/platform/**/*',
    COMPONENT_PLATFORM_THEME: 'templates/ui/component/theme/**/*',
    COMPONENT_PLATFORM_SPEC: 'templates/ui/component/spec/**/*',
    COMPONENT_PLATFORM_MODULE: 'templates/ui/component/module/**/*',
    CDK: 'templates/ui/cdk/base/**/*',
    CDK_PLATFORM: 'templates/ui/cdk/platform/**/*',
    CDK_PLATFORM_THEME: 'templates/ui/cdk/theme/**/*',
    CDK_PLATFORM_SPEC: 'templates/ui/cdk/spec/**/*',
    CDK_PLATFORM_MODULE: 'templates/ui/cdk/module/**/*',
    MATERIAL: 'templates/ui/material/base/**/*',
    MATERIAL_PLATFORM: 'templates/ui/material/platform/**/*',
    MATERIAL_PLATFORM_THEME: 'templates/ui/material/theme/**/*',
    MATERIAL_PLATFORM_SPEC: 'templates/ui/material/spec/**/*',
    MATERIAL_PLATFORM_MODULE: 'templates/ui/material/module/**/*',
    SERVICE: 'templates/ui/service/base/**/*',
    SERVICE_PLATFORM: 'templates/ui/service/platform/**/*',
    SERVICE_PLATFORM_THEME: 'templates/ui/service/theme/**/*',
    SERVICE_PLATFORM_SPEC: 'templates/ui/service/spec/**/*',
    SERVICE_PLATFORM_MODULE: 'templates/ui/service/module/**/*'
};
exports.templatePaths = templatePaths;
var gulpTasks = {
    GENERATE: 'generate'
};
exports.gulpTasks = gulpTasks;
