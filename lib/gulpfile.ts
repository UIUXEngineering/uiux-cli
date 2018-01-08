import { yellow } from 'chalk';
import { writeFile } from 'fs';
import { dirname, join, normalize } from 'path';
import { CONSTANSTS } from './constants';
import { copySetTask } from './ui-tasks/copy';
import './ui-tasks/generate';
import { processIconSet } from './ui-tasks/svg-icons';
/**
 * This file is only for scaffolding to place
 * conditions if you do not want to directly
 * run a gulp task. For example, if you want
 * to run node or bash files directly.
 */
import { getArgs, IArgs, IProcessState, parseArgs } from './utils/parse-args';
import {ICLITasks, ICopy, Isvg, parseCLIJson} from './utils/parse-cli-json';
import ErrnoException = NodeJS.ErrnoException;

const stringUtils = require('ember-cli-string-utils');
const gulp = require('gulp');
const mkdirp = require('mkdirp');

let state: IProcessState = parseArgs();
const args: IArgs = getArgs();

if (state.canProcess) {

  /**
   * Change process working directory to root directory of cli.
   */
  process.chdir(args.gulp.cwd);

  const cliTasks: ICLITasks = parseCLIJson(args);
  let filePath: string;

  if (state.template) {

    gulp.start(args.gulp.task);
  }

  if (state.svg) {

    let content = CONSTANSTS.GENERATE_MSG + '\n';
    content += '// Paths are relative to root app directory where index.html is served.\n';
    content += 'export const svgAssets: any = {\n';
    cliTasks.svg.sets.forEach((svgSet: Isvg) => {

      const filepath = normalize(
        join(svgSet.outDir, svgSet.setName)
      ) + '-' + svgSet.version + '.svg';

      let propAndValue = '  ' +
        stringUtils.underscore(svgSet.setName).toUpperCase() +
        ': \'' + filepath.split('/').slice(1).join('/') +
        '\',\n';

      propAndValue = propAndValue.replace('\/\/', '\/');
      content += propAndValue;


      processIconSet(JSON.parse(JSON.stringify(svgSet)), cliTasks);
    });

    content += '};\n';

    filePath = join(cliTasks.relativeToProjectRoot, cliTasks.svg.tsReference);

    mkdirp(dirname(filePath), function (err: any) {
      if (err) {
        console.error(err);
      } else {
        writeFile(filePath, content, (err: ErrnoException) => {
          if (err) {
            return console.log(err);
          }

          console.log('\n');
          console.log(yellow(`    reference: ${cliTasks.svg.tsReference}`));
          console.log('\n');
        });
      }
    });

  }

  if (state.copy) {
    console.log('\n');
    cliTasks.copy.sets.forEach((copy: ICopy) => {
      copySetTask(JSON.parse(JSON.stringify(copy)), cliTasks);
    });
  }

}






