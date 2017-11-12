import { red, bold } from 'chalk';
import { join, relative, resolve } from 'path';
import { templateTypes, templatePaths, gulpTasks } from '../ui-tasks/enums';

const stringUtils = require('ember-cli-string-utils');

export interface IProcessState {
  canProcess: boolean;
}

let processState = {
  canProcess: false,
};

export interface IArgs {
  template: string;
  templateVars: {
    name?: string;
    className?: string;
    dashCaseBasename?: string;
    componentFilename?: string;
    moduleFilename?: string;
    themeFilename?: string;
    specFilename?: string;
  };
  gulp: IGulpParams;
}

export interface IGulpParams {
  task?: any;
  srcTemplate: string;
  srcPlatform: string;
  srcModule: string;
  srcTheme: string;
  srcSpec: string;
  cwd: string;
  dest: string;
  renameComponent: IGulpRename;
  renameModule: IGulpRename;
  renameTheme: IGulpRename;
  renameSpec: IGulpRename;
}

export interface IGulpRename {
  basename: string;
  dirname?: string;
  prefix?: string;
  suffix?: string;
  extname?: string;
}

let args: IArgs = {

  template: '',

  templateVars: {

  },

  gulp: {
    task: '',
    srcTemplate: '',
    srcPlatform: '',
    srcModule: '',
    srcTheme: '',
    srcSpec: '',
    cwd: '',
    dest: '',
    renameComponent: {
      basename: '',
    },
    renameSpec: {
      basename: '',
    },
    renameModule: {
      basename: '',
    },
    renameTheme: {
      basename: '',
    },
  },
};


export function getArgs(): IArgs {
  return args;
}

export function parseArgs(): IProcessState {
  let argList: string[] = process.argv;

  if ( argList ) {
    if ( argList.indexOf('--version') !== -1 ) {
      let pkg: any = require('../../package.json');
      console.log(pkg.version);
    } else if ( argList.indexOf('g') !== -1 || argList.indexOf('generate') !== -1 ) {
      processState.canProcess = true;
      parseTemplateParams(argList);
    } else {
      console.error(`${bold(red('No Params Provided'))}`);
    }
  }

  return processState;
}

function parseTemplateParams(argList: string[]): void {

  let index: number = argList.indexOf('g') || argList.indexOf('generate');

  // get rest of arg list after 'g' or 'generage'
  let opts: string[] = argList.slice(index);

  if ( !opts[ 1 ] ) {
    console.error(`${bold(red('Template type not Provided'))}`);
    return;
  }

  if ( !opts[ 2 ] ) {
    // TODO tell which type of template name is not provided
    console.error(`${bold(red('Template name not Provided'))}`);
    return;
  }

  // GULP TASK
  // GULP TASK
  // GULP TASK
  args.gulp.task = gulpTasks.GENERATE;

  // Template Variables
  // templateTypes enum
  args.template = opts[ 1 ].toUpperCase();

  args.templateVars.name = opts[ 2 ];
  args.templateVars.className = stringUtils.classify(opts[ 2 ]);


    Object.assign(args.gulp, parseGulpPaths(args, opts));

  // concat instead of using gulp-template
  // 'suffix'
  args.templateVars.dashCaseBasename = args.gulp.renameComponent.basename;

  // platform
  args.templateVars.componentFilename =
    args.gulp.renameComponent.basename + args.gulp.renameComponent.suffix;

  args.templateVars.specFilename =
    args.gulp.renameSpec.basename + args.gulp.renameSpec.suffix;

  args.templateVars.moduleFilename =
    args.gulp.renameModule.basename + args.gulp.renameModule.suffix;

  args.templateVars.themeFilename =
    args.gulp.renameTheme.basename + args.gulp.renameTheme.suffix;

  // if ( args.template === templateTypes.MATERIAL.toString() ) {
  //
  //   // concat instead of using gulp-template
  //   // 'suffix'
  //   args.templateVars.dashCaseBasename = args.gulp.renameComponent.basename;
  //
  //   // platform
  //   args.templateVars.componentFilename =
  //     args.gulp.renameComponent.basename + args.gulp.renameComponent.suffix;
  //
  //   args.templateVars.moduleFilename =
  //     args.gulp.renameModule.basename + args.gulp.renameModule.suffix;
  //
  //   args.templateVars.themeFilename =
  //     args.gulp.renameTheme.basename + args.gulp.renameTheme.suffix;
  // }

}

function parseGulpPaths(_args: IArgs, opts: string[]): IGulpParams {

  let gulpParams: IGulpParams = {
    srcTemplate: '',
    srcPlatform: '',
    srcModule: '',
    srcTheme: '',
    srcSpec: '',
    cwd: '',
    dest: '',
    renameComponent: {
      basename: '',
    },
    renameSpec: {
      basename: '',
    },
    renameModule: {
      basename: '',
    },
    renameTheme: {
      basename: '',
    },
  };

  // Base File Name
  gulpParams.renameComponent.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameSpec.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameModule.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameTheme.basename = '_' + stringUtils.dasherize(opts[ 2 ]);

  // concat instead of using gulp-template
  // 'suffix'
  gulpParams.renameComponent.suffix = '.component';
  gulpParams.renameModule.suffix = '.module';
  gulpParams.renameTheme.suffix = '.theme';

  if ( _args.template === templateTypes.MATERIAL || _args.template === templateTypes.COMPONENT ) {
    gulpParams.renameSpec.suffix = '.component.spec';
  }

  // GULP SRC
  // GULP SRC
  // GULP SRC
  let sources: any = gulpSrc(_args.template);

  gulpParams.srcTemplate = sources.srcTemplate;
  gulpParams.srcPlatform = sources.srcPlatform;
  gulpParams.srcModule = sources.srcModule;
  gulpParams.srcTheme = sources.srcTheme;
  gulpParams.srcSpec = sources.srcSpec;

  // GULP CWD
  // GULP CWD
  // GULP CWD

  /**
   * gulpParams.cwd = Root directory of cli.
   */
  gulpParams.cwd = resolve(__dirname, '../', '../');

  // GULP DEST
  // GULP DEST
  // GULP DEST
  let destProjectRootPath: string = relative(gulpParams.cwd, process.cwd());

  let destRelativeToProjectPath = '';

  // if path provided
  if ( opts[ 3 ] ) {

    /**
     * Change name from camel case to dash case.
     * @type {string}
     */
    destRelativeToProjectPath = opts[ 3 ] + '/' + stringUtils.dasherize(opts[ 2 ]);
  } else {
    /**
     * Change name from camel case to dash case.
     * @type {string}
     */
    destRelativeToProjectPath = stringUtils.dasherize(opts[ 2 ]);
  }

  gulpParams.dest = join(
    destProjectRootPath,
    gulpBaseDestinationDirectory(_args),
    destRelativeToProjectPath);

  return gulpParams;
}

/**
 * srcTemplates actually returns a string, typescript
 * data type checker is wrong.
 *
 * @param {string} _templateType
 * @returns {number}
 */
function gulpSrc(_templateType: string): any {
  switch ( _templateType ) {

    // ui platform
    case templateTypes.MATERIAL:
      return {
        srcTemplate: templatePaths.MATERIAL,
        srcPlatform: templatePaths.MATERIAL_PLATFORM,
        srcModule: templatePaths.MATERIAL_PLATFORM_MODULE,
        srcTheme: templatePaths.MATERIAL_PLATFORM_THEME,
        srcSpec: templatePaths.MATERIAL_PLATFORM_SPEC,
      };

    // ui platform
    case templateTypes.CDK:
      return {
        srcTemplate: templatePaths.CDK,
        srcPlatform: templatePaths.CDK_PLATFORM,
        srcModule: templatePaths.CDK_PLATFORM_MODULE,
        srcSpec: templatePaths.CDK_PLATFORM_SPEC,
        srcTheme: null,
      };

    // ui platform
    case templateTypes.COMPONENT:
      return {
        srcTemplate: templatePaths.COMPONENT,
        srcPlatform: templatePaths.COMPONENT_PLATFORM,
        srcModule: templatePaths.COMPONENT_PLATFORM_MODULE,
        srcTheme: templatePaths.COMPONENT_PLATFORM_THEME,
        srcSpec: templatePaths.COMPONENT_PLATFORM_SPEC,
      };

    default:
      return '';
  }
}

function gulpBaseDestinationDirectory(_args: IArgs): string {
  switch ( args.template ) {

    // ui platform
    case templateTypes.MATERIAL:
      return 'src/lib';

    // ui platform
    case templateTypes.CDK:
      return 'src/cdk';

    // ui platform
    case templateTypes.COMPONENT:
      return 'src/app';

    default:
      return '';
  }
}
