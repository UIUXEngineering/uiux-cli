import { existsSync, lstatSync, statSync, } from 'fs';
import { error } from 'util';
import { join, relative, resolve } from 'path';

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
  svgIcons: {
    tsReference: string;
    sets: ISVGIcons[]
  };
}

let cliTasks: ICLITasks = {
  svgIcons: {
    tsReference: 'src/environment/svgAssets.ts',
    sets: [],
  },
};

export function getCliTasks(): ICLITasks {
  return cliTasks;
}

export function parseCLIJson(): ICLITasks {
  const cwd = resolve( __dirname, '../', '../' );
  const destProjectRootPath: string = relative( cwd, process.cwd() );
  let cliFile: ICLITasks;
  if ( destProjectRootPath.length ) {
    cliFile = require( join( destProjectRootPath, '.ix-cli.json' ) );
  } else {
    cliFile = require( join( cwd, '.ix-cli.json' ) );
  }

  if ( cliFile[ 'svgIcons' ] ) {
    const iconConfigs: any = cliFile[ 'svgIcons' ];

    iconConfigs.sets.forEach( ( config: ISVGIcons ) => {
      cliTasks.svgIcons.sets.push( config );
    } );

    cliTasks.svgIcons.tsReference = cliFile.svgIcons.tsReference;
  }

  return cliTasks;
}

function isFile( file: any ) {
  let stats: any, method: Function;

  if ( lstatSync ) {
    method = lstatSync; // node 2015
  } else if ( lstatSync ) {
    method = existsSync; // node 2012
  } else if ( existsSync ) {
    method = statSync; // node 2010
  } else {
    method = () => { /* noop */
    };
  }

  try {
    // Query the entry
    stats = method( file );
  } catch ( e ) {
    console.log( error( 'ERROR: file does not exist: ' + file ) );
  }

  if ( existsSync ) {
    return stats;
  } else {
    return stats.isFile();
  }
}




