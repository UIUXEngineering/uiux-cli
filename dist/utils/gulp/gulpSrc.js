"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * srcBases actually returns a string, typescript
 * data type checker is wrong.
 *
 * @param {string} _templateType
 * @returns {number}
 */
var enums_1 = require("../enums");
function gulpSrc(_templateType) {
    switch (_templateType) {
        // ui platform
        case enums_1.templateTypes.MATERIAL:
            return {
                srcBase: enums_1.templatePaths.MATERIAL,
                srcPlatform: enums_1.templatePaths.MATERIAL_PLATFORM,
                srcModule: enums_1.templatePaths.MATERIAL_PLATFORM_MODULE,
                srcTheme: enums_1.templatePaths.MATERIAL_PLATFORM_THEME,
                srcSpec: enums_1.templatePaths.MATERIAL_PLATFORM_SPEC,
            };
        // ui platform
        case enums_1.templateTypes.CDK:
            return {
                srcBase: enums_1.templatePaths.CDK,
                srcPlatform: enums_1.templatePaths.CDK_PLATFORM,
                srcModule: enums_1.templatePaths.CDK_PLATFORM_MODULE,
                srcSpec: enums_1.templatePaths.CDK_PLATFORM_SPEC,
                srcTheme: null,
            };
        // ui platform
        case enums_1.templateTypes.COMPONENT:
            return {
                srcBase: enums_1.templatePaths.COMPONENT,
                srcPlatform: enums_1.templatePaths.COMPONENT_PLATFORM,
                srcModule: enums_1.templatePaths.COMPONENT_PLATFORM_MODULE,
                srcTheme: enums_1.templatePaths.COMPONENT_PLATFORM_THEME,
                srcSpec: enums_1.templatePaths.COMPONENT_PLATFORM_SPEC,
            };
        // ui platform
        case enums_1.templateTypes.SERVICE:
            return {
                srcBase: enums_1.templatePaths.SERVICE,
                srcPlatform: enums_1.templatePaths.SERVICE_PLATFORM,
                srcModule: enums_1.templatePaths.SERVICE_PLATFORM_MODULE,
                srcTheme: enums_1.templatePaths.SERVICE_PLATFORM_THEME,
                srcSpec: enums_1.templatePaths.SERVICE_PLATFORM_SPEC,
            };
        default:
            return '';
    }
}
exports.gulpSrc = gulpSrc;
