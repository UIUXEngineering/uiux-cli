import { dest, src, task } from 'gulp';
import { green, yellow } from 'chalk';
import { join, normalize } from 'path';
import { ICLITasks, ICopy } from '../utils/parse-cli-json';

let gulp = require( 'gulp' );

export function copySet( copySet: ICopy, cliTasks: ICLITasks ): void {

  // Create files paths for gulp
  let srcFileKeys: string [] = Object.keys( copySet.srcFiles );

  // "design/icons/views"
  let filePaths: string[] = srcFileKeys.reduce( ( acc: any, _srcFilePath: string ) => {

    console.log( yellow( `    src: ${_srcFilePath}` ) );
    const _files: string[] = copySet.srcFiles[ _srcFilePath ].reduce( ( _acc: any, _fileName: string ) => {
      const _path = normalize( join( cliTasks.relativeToProjectRoot, _srcFilePath, _fileName ) );
      console.log( green( `    includes: ${join( _srcFilePath, _fileName )}` ) );
      _acc.push( _path );
      return _acc;
    }, [] );

    acc = acc.concat( _files );
    return acc;

  }, [] );

  console.log( yellow( `    dest: ${copySet.outDir}` ) );
  console.log( '\n' );

  task( 'copy', function () {

    return src( filePaths )
      .pipe( dest( join( cliTasks.relativeToProjectRoot, copySet.outDir ) ) );
  } );

  gulp.start( 'copy' );
}


