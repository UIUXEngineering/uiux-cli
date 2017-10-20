export enum templateTypes {
  API_SERVICE = 'API.SERVICE',

  // ui
  COMPONENT = 'COMPONENT',
  CDK = 'CDK',
  MATERIAL = 'MATERIAL',
  SERVICE = 'SERVICE',
  COMPONENT_SPEC = 'COMPONENT.SPEC',
}

// **ATTENTION** properties need to match templateTypes
export enum templatePaths {
  COMPONENT = 'templates/ui/component/base/**/*',
  CDK = 'templates/ui/cdk/base/**/*',
  CDK_PLATFORM = 'templates/ui/cdk/platform/**/*',
  CDK_PLATFORM_THEME = 'templates/ui/cdk/theme/**/*',
  CDK_PLATFORM_MODULE = 'templates/ui/material/module/**/*',
  MATERIAL = 'templates/ui/material/base/**/*',
  MATERIAL_PLATFORM = 'templates/ui/material/platform/**/*',
  MATERIAL_PLATFORM_THEME = 'templates/ui/material/componentTheme/**/*',
  MATERIAL_PLATFORM_MODULE = 'templates/ui/material/module/**/*'
}

export enum gulpTasks {
  GENERATE = 'generate'
}
