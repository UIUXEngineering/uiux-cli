import {red} from 'chalk';

export interface IArgs {
  g: boolean;
  template: string | null;
  path: string | null;
}

let args: IArgs = {
  g: false,
  template: null,
  path: null,
};


export function getArgs(): IArgs {
  return args;
}

export function getArgsArray(): void {
  let argList: string[] = process.argv;

  if (argList) {
    if (argList.indexOf('--version') !== -1) {
      let pkg: any = require('../../package.json');
      console.log(pkg.version);
    } else if (argList.indexOf('g') === -1) {
      console.log(`${red('No Params Provided')}`);
    } else {
     parseArgs(argList);
    }
  }
}

function parseArgs(argList: string[]): void {
  let opts: string[] = argList.slice(argList.indexOf('g'));
  args.g = true;
  args.template = opts[1].toUpperCase();
  args.path = opts[2].toUpperCase();
}
