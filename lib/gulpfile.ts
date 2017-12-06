/**
 * This file is only for scaffolding to place
 * conditions if you do not want to directly
 * run a gulp task. For example, if you want
 * to run node or bash files directly.
 */
import { getArgs, IArgs, IProcessState, parseArgs } from './utils/parse-args';
import { ICLITasks, Isvg, parseCLIJson } from './utils/parse-cli-json';
import { processIconSet } from './ui-tasks/svg-icons';
import './ui-tasks/generate';
import { dirname, join, normalize } from 'path';
import { writeFile } from 'fs';
import ErrnoException = NodeJS.ErrnoException;
import { bold, red, green, yellow } from 'chalk';
import { CONSTANSTS } from './constants';

const stringUtils = require( 'ember-cli-string-utils' );
const gulp = require( 'gulp' );
const mkdirp = require( 'mkdirp' );

let state: IProcessState = parseArgs();
const args: IArgs = getArgs();

if ( state.canProcess ) {

  /**
   * Change process working directory to root directory of cli.
   */
  process.chdir( args.gulp.cwd );

  const cliTasks: ICLITasks = parseCLIJson( args );

  if ( state.template ) {

    gulp.start( args.gulp.task );
  }

  if ( state.svg ) {

    let content = CONSTANSTS.GENERATE_MSG + '\n';
    content += '// Paths are relative to root app directory where index.html is served.\n';
    content += 'export const svgAssets: any = {\n';
    cliTasks.svg.sets.forEach( ( iconSet: Isvg ) => {

      const filepath = normalize(
        join( iconSet.outDir, iconSet.setName ),
      ) + '-' + iconSet.version + '.svg';

      let propAndValue = '  ' + stringUtils.underscore( iconSet.setName ).toUpperCase() + ': \'/' + filepath.substr(4) + '\',\n';
      propAndValue = propAndValue.replace('\/\/', '\/');
      content += propAndValue;


      processIconSet( JSON.parse( JSON.stringify( iconSet ) ), cliTasks );
    } );

    content += '};\n';

    const filePath: string = join( cliTasks.relativeToProjectRoot, cliTasks.svg.tsReference );

    mkdirp( dirname(filePath), function ( err: any ) {
      if ( err ) {
        console.error( err );
      } else {
        writeFile( filePath, content, ( err: ErrnoException ) => {
          if ( err ) {
            return console.log( err );
          }

          console.log( '\n' );
          console.log(yellow(`    reference: ${cliTasks.svg.tsReference}`));
          console.log( '\n' );
        } );
      }
    } );

  }

}






