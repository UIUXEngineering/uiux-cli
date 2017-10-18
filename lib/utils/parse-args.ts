import { red } from 'chalk';
import { join } from 'path';
const stringUtils = require('ember-cli-string-utils');

export interface IArgs {
  g: boolean;
  template: string | null;
  name: string | null;
  path: string | null;
}

let args: IArgs = {
  g: false,
  template: null,
  name: null,
  path: null,
};


export function getArgs(): IArgs {
  return args;
}

export function getArgsArray(): IArgs {
  let argList: string[] = process.argv;

  if ( argList ) {
    if ( argList.indexOf('--version') !== -1 ) {
      let pkg: any = require('../../package.json');
      console.log(pkg.version);
    } else if ( argList.indexOf('g') === -1 || argList.indexOf('generate') === -1 ) {
      console.log(`${red('No Params Provided')}`);
    } else {
      parseArgs(argList);
    }
  }

  return getArgs();
}

function parseArgs(argList: string[]): void {
  let index: number = argList.indexOf('g') || argList.indexOf('generate');
  let opts: string[] = argList.slice(index);
  args.g = true;
  args.template = opts[ 1 ].toUpperCase();
  args.name = opts[ 2 ].toUpperCase();

  if (opts[ 3 ]) {
    console.log(process.cwd())
    args.path = opts[ 3 ] + '/' + stringUtils.dasherize(opts[ 3 ]);
  }

}
