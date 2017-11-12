import { join, relative, resolve } from 'path';
import { gulpDest } from './gulpDest';
import { IArgs, IGulpParams } from '../parse-args';
import { templateTypes } from '../enums';
import { gulpSrc } from './gulpSrc';
const stringUtils = require('ember-cli-string-utils');

export function gulpPaths(_args: IArgs, opts: string[]): IGulpParams {

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
      suffix: '',
    },
    renameSpec: {
      basename: '',
      suffix: '',
    },
    renameModule: {
      basename: '',
      suffix: '',
    },
    renameTheme: {
      basename: '',
      suffix: '',
    },
  };

  // Base File Name
  gulpParams.renameComponent.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameSpec.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameModule.basename = stringUtils.dasherize(opts[ 2 ]);
  gulpParams.renameTheme.basename = '_' + stringUtils.dasherize(opts[ 2 ]);

  // concat instead of using gulp-template
  // 'suffix'

  gulpParams.renameModule.suffix = '.module';
  gulpParams.renameTheme.suffix = '.theme';

  if ( _args.template === templateTypes.MATERIAL || _args.template === templateTypes.COMPONENT ) {
    gulpParams.renameComponent.suffix = '.component';
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
  gulpParams.cwd = resolve(__dirname, '../', '../', '../');

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
    gulpDest(_args),
    destRelativeToProjectPath);

  return gulpParams;
}
