import { mkdir, } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { IArgs } from './parse-args';

const stringUtils = require( 'ember-cli-string-utils' );

export interface IProcessState {
  canProcess: boolean;
}

let processState = {
  canProcess: false,
};

export interface ISVGIcons {
  srcDir: string;
  gulpSrc: string[];
  srcFiles: {
    [ key: string ]: any
  };
  setName: string;
  version: string;
  outDir: string;
}

export interface ICLITasks {
  relativeToProjectRoot: string;
  svgIcons: {
    tsReference: string;
    sets: ISVGIcons[]
  };
}

let cliTasks: ICLITasks = {
  relativeToProjectRoot: '',
  svgIcons: {
    tsReference: 'src/environment/svgAssets.ts',
    sets: [],
  },
};

export function getCliTasks(): ICLITasks {
  return cliTasks;
}

export function parseCLIJson( args: IArgs ): ICLITasks {

  const destProjectRootPath: string = relative( args.gulp.cwd, args.processCwd ) || '';

  cliTasks.relativeToProjectRoot = relative( resolve( __dirname, '../', '../' ), destProjectRootPath );

  let cliFile: ICLITasks = require( join( relative( resolve( __dirname ), destProjectRootPath ), '.sp-cli.json' ) );

  if ( cliFile[ 'svgIcons' ] ) {
    const iconConfigs: any = cliFile[ 'svgIcons' ];

    iconConfigs.sets.forEach( ( config: ISVGIcons ) => {
      cliTasks.svgIcons.sets.push( config );
    } );

    cliTasks.svgIcons.tsReference = cliFile.svgIcons.tsReference;
  }

  return cliTasks;
}




