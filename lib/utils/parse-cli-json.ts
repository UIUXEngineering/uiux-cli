import { join, relative, resolve } from 'path';
import { IArgs } from './parse-args';
import { CONSTANSTS } from '../constants';

const stringUtils = require('ember-cli-string-utils');

export interface IProcessState {
  canProcess: boolean;
}

let processState = {
  canProcess: false,
};

export interface Isvg {
  srcDir: string;
  gulpSrc: string[];
  srcFiles: {
    [ key: string ]: any
  };
  setName: string;
  version: string;
  outDir: string;
}

export interface ICopy {
  id: string;
  outDir: string;
  srcFiles: {
    [ key: string ]: any
  };
}

export interface ICLITasks {
  relativeToProjectRoot: string;
  svg: {
    tsReference: string;
    sets: Isvg[]
  };
  copy: {
    sets: ICopy[]
  },
}

let cliTasks: ICLITasks = {
  relativeToProjectRoot: '',
  svg: {
    tsReference: 'src/environment/svgAssets.ts',
    sets: [],
  },
  copy: {
    sets: [],
  }
};

export function getCliTasks(): ICLITasks {
  return cliTasks;
}

export function parseCLIJson(args: IArgs): ICLITasks {

  const destProjectRootPath: string = relative(args.gulp.cwd, args.processCwd) || '';

  cliTasks.relativeToProjectRoot = relative(resolve(__dirname, '../', '../'), destProjectRootPath);

  let cliFile: ICLITasks = require(join(relative(resolve(__dirname), destProjectRootPath), CONSTANSTS.CLI_NAME));

  if (cliFile['svg']) {
    const svgConfigs: any = cliFile['svg'];

    svgConfigs.sets.forEach((config: Isvg) => {
      cliTasks.svg.sets.push(config);
    });

    cliTasks.svg.tsReference = cliFile.svg.tsReference;
  }

  if (cliFile['copy']) {
    const svgConfigs: any = cliFile['copy'];
    const copyItems: string[] = args.gulp.copyItems || [];
    svgConfigs.sets.forEach((config: ICopy) => {
      if (config.id) {
        if (copyItems && copyItems.length) {
          if (copyItems.indexOf(config.id) !== -1) {
            cliTasks.copy.sets.push(config);
          }
        } else {
          cliTasks.copy.sets.push(config);
        }
      } else {
        cliTasks.copy.sets.push(config);
      }

    });
  }

  return cliTasks;
}




