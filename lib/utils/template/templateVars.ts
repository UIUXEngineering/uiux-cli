
import { IArgs } from '../parse-args';
const stringUtils = require('ember-cli-string-utils');

export function templateVars(args: IArgs, opts: string[]): IArgs {

  args.templateVars.name = opts[ 2 ];
  args.templateVars.className = stringUtils.classify(opts[ 2 ]);


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

  return args;
}
