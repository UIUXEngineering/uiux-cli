import { yellow } from 'chalk';
import { writeFile } from 'fs';
import { dirname, join, normalize } from 'path';
import { CONSTANSTS } from './constants';
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
  let tsReferencePath: string;
  let tsSpritePath: string;

  if (state.template) {

    gulp.start(args.gulp.task);
  }

  if (state.svg) {

    // process apps
    cliTasks.svg.forEach((svg: any) => {

      let content = CONSTANSTS.GENERATE_MSG + '\n';
      content += '// Paths are relative to root app directory where index.html is served.\n';
      content += 'export const svgAssets: any = {\n';

      // process sets
      svg.sets.forEach((svgSet: Isvg) => {

        const pathFromHTML = normalize(
          join(svgSet.pathFromHTML, svgSet.setName)
        ) + '-' + svgSet.version + '.svg';

        let propAndValue = '  ' +
          stringUtils.underscore(svgSet.setName).toUpperCase() +
          // ': \'' + pathFromHTML.split('/').slice(1).join('/') +
          ': \'' + pathFromHTML +
          '\',\n';

        propAndValue = propAndValue.replace('\/\/', '\/');
        content += propAndValue;


        processIconSet(JSON.parse(JSON.stringify(svgSet)), svg);
      });

      content += '};\n';

      if (svg.tsReferenceFilePath && svg.tsReferenceFilePath.length) {
        tsReferencePath = join(svg.relativeToProjectRoot, svg.tsReferenceFilePath);

        mkdirp(dirname(tsReferencePath), function ( err: any) {
          if (err) {
            console.error(err);
          } else {
            writeFile(tsReferencePath, content, ( err: ErrnoException) => {
              if (err) {
                return console.log(err);
              }

              console.log('\n');
              console.log(yellow(`    reference: ${svg.tsReferenceFilePath}`));
              console.log('\n');
            });
          }
        });
      }

      if (svg.tsSprite && svg.tsSprite.length) {
        tsSpritePath = join(svg.relativeToProjectRoot, svg.tsSprite);

        mkdirp(dirname(tsSpritePath), function ( err: any) {
          if (err) {
            console.error(err);
          } else {
            writeFile(tsSpritePath, content, ( err: ErrnoException) => {
              if (err) {
                return console.log(err);
              }

              console.log('\n');
              console.log(yellow(`    reference: ${svg.tsSprite}`));
              console.log('\n');
            });
          }
        });
      }

    });


  }
}






