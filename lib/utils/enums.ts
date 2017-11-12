const templateTypes = {
  API_SERVICE: 'API.SERVICE',

  // ui
  COMPONENT: 'COMPONENT',
  CDK: 'CDK',
  MATERIAL: 'MATERIAL',
  SERVICE: 'SERVICE',
  COMPONENT_SPEC: 'COMPONENT.SPEC',
};

// **ATTENTION** properties need to match templateTypes
const templatePaths = {
  COMPONENT:                      'templates/ui/component/base/**/*',
  COMPONENT_PLATFORM:             'templates/ui/component/platform/**/*',
  COMPONENT_PLATFORM_THEME:       'templates/ui/component/theme/**/*',
  COMPONENT_PLATFORM_SPEC:        'templates/ui/component/spec/**/*',
  COMPONENT_PLATFORM_MODULE:      'templates/ui/component/module/**/*',

  CDK:                            'templates/ui/cdk/base/**/*',
  CDK_PLATFORM:                   'templates/ui/cdk/platform/**/*',
  CDK_PLATFORM_THEME:             'templates/ui/cdk/theme/**/*',
  CDK_PLATFORM_SPEC:              'templates/ui/cdk/spec/**/*',
  CDK_PLATFORM_MODULE:            'templates/ui/cdk/module/**/*',

  MATERIAL:                       'templates/ui/material/base/**/*',
  MATERIAL_PLATFORM:              'templates/ui/material/platform/**/*',
  MATERIAL_PLATFORM_THEME:        'templates/ui/material/theme/**/*',
  MATERIAL_PLATFORM_SPEC:         'templates/ui/material/spec/**/*',
  MATERIAL_PLATFORM_MODULE:       'templates/ui/material/module/**/*'
};

const gulpTasks = {
  GENERATE: 'generate'
};

export { templateTypes, templatePaths, gulpTasks };
