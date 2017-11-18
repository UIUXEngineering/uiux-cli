/**
 * srcBases actually returns a string, typescript
 * data type checker is wrong.
 *
 * @param {string} _templateType
 * @returns {number}
 */
import { templatePaths, templateTypes } from '../enums';

export function gulpSrc(_templateType: string): any {
  switch ( _templateType ) {

    // ui platform
    case templateTypes.MATERIAL:
      return {
        srcBase: templatePaths.MATERIAL,
        srcPlatform: templatePaths.MATERIAL_PLATFORM,
        srcModule: templatePaths.MATERIAL_PLATFORM_MODULE,
        srcTheme: templatePaths.MATERIAL_PLATFORM_THEME,
        srcSpec: templatePaths.MATERIAL_PLATFORM_SPEC,
      };

    // ui platform
    case templateTypes.CDK:
      return {
        srcBase: templatePaths.CDK,
        srcPlatform: templatePaths.CDK_PLATFORM,
        srcModule: templatePaths.CDK_PLATFORM_MODULE,
        srcSpec: templatePaths.CDK_PLATFORM_SPEC,
        srcTheme: null,
      };

    // ui platform
    case templateTypes.COMPONENT:
      return {
        srcBase: templatePaths.COMPONENT,
        srcPlatform: templatePaths.COMPONENT_PLATFORM,
        srcModule: templatePaths.COMPONENT_PLATFORM_MODULE,
        srcTheme: templatePaths.COMPONENT_PLATFORM_THEME,
        srcSpec: templatePaths.COMPONENT_PLATFORM_SPEC,
      };

    // ui platform
    case templateTypes.SERVICE:
      return {
        srcBase: templatePaths.SERVICE,
        srcPlatform: templatePaths.SERVICE_PLATFORM,
        srcModule: templatePaths.SERVICE_PLATFORM_MODULE,
        srcTheme: templatePaths.SERVICE_PLATFORM_THEME,
        srcSpec: templatePaths.SERVICE_PLATFORM_SPEC,
      };

    default:
      return '';
  }
}
