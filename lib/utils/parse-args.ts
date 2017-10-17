
export function getProcessArgsObject(): any {
  let argList: string[] = process.argv;

  let arg: any = {};
  let a: number = 0;
  let opt: string | null = null;
  let thisOpt: string | null = null;
  let curOpt: string | null = null;

  for (a; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {

      // argument value
      if (curOpt) {
        arg[curOpt] = opt;
      }
      curOpt = null;

    } else {

      // argument name
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;
}

export function getArgsArray(): string[] {
  let argList: string[] = process.argv;
  return argList;
}
