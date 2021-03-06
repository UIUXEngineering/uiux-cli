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
  pathFromHTML: string;
}

export interface ICopy {
  id: string;
  outDir: string;
  srcFiles: {
    [ key: string ]: any
  };
}

export interface ICLITasks {

  svg: {
    relativeToProjectRoot: string;
    tsReference: string;
    sets: Isvg[]
  }[];
  copy: {
    sets: ICopy[]
  };
}

let cliTasks: ICLITasks = {
  svg: [{
    relativeToProjectRoot: '',
    tsReference: 'src/environment/svgAssets.ts',
    sets: [],
  }],
  copy: {
    sets: [],
  }
};

export function getCliTasks(): ICLITasks {
  return cliTasks;
}

export function parseCLIJson(args: IArgs): ICLITasks {

  const destProjectRootPath: string = relative(args.gulp.cwd, args.processCwd) || '';

  const relativeToProjectRoot = relative(resolve(__dirname, '../', '../'), destProjectRootPath);

  let cliFile: ICLITasks = require(join(relative(resolve(__dirname), destProjectRootPath),
                                        CONSTANSTS.CLI_NAME));

  if (cliFile['svg']) {
    const svgConfigs: any = cliFile['svg'];

    (<any[]>svgConfigs).forEach((svgConfig: any, index: number) => {
      svgConfig.sets.forEach((_config: Isvg) => {
        cliTasks.svg[index].sets.push(_config);
        cliTasks.svg[index].relativeToProjectRoot = relativeToProjectRoot;
        cliTasks.svg[index].tsReference = svgConfigs[index].tsReference;
      });
    });
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




