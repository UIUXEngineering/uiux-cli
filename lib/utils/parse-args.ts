import { bold, red } from 'chalk';
import { gulpTasks } from './enums';
import { gulpPaths } from './gulp/gulpPaths';
import { templateVars } from './template/templateVars';

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
  srcBase: string;
  srcPlatform: string;
  srcModule: string;
  srcTheme: string;
  srcSpec: string;
  cwd: string;
  dest: string;
  renameBase: IGulpRename;
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
    srcBase: '',
    srcPlatform: '',
    srcModule: '',
    srcTheme: '',
    srcSpec: '',
    cwd: '',
    dest: '',
    renameBase: {
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

  // Template Variables
  // templateTypes enum
  args.template = opts[ 1 ].toUpperCase();

  args.gulp = gulpPaths(args, opts);

  // GULP TASK
  // GULP TASK
  // GULP TASK
  args.gulp.task = gulpTasks.GENERATE;

  args = templateVars(args, opts);

}




