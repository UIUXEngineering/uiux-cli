import { dest, src, task } from 'gulp';
import { green, magenta, yellow } from 'chalk';
import { join, normalize, resolve } from 'path';
import { ICLITasks, ICopy } from '../utils/parse-cli-json';
import { sequenceTask } from '../utils/sequence-task';
import * as rmfr from 'rmfr';

let gulp = require('gulp');

export function copySetTask(copySet: ICopy, cliTasks: ICLITasks): void {

  console.log(yellow(`Running Copy Set: ${copySet.id} \n`));
  // Create files paths for gulp
  let srcFileKeys: string [] = Object.keys(copySet.srcFiles);

  // "design/icons/views"
  let filePaths: string[] = srcFileKeys.reduce((acc: any, _srcFilePath: string) => {
    console.log(yellow(`    src: ${_srcFilePath}`));
    const _files: string[] = copySet.srcFiles[_srcFilePath].reduce((_acc: any, _fileName: string) => {
      const _path = normalize(join(cliTasks.relativeToProjectRoot, _srcFilePath, _fileName));
      console.log(green(`    includes: ${join(_srcFilePath, _fileName)}`));
      _acc.push(_path);
      return _acc;
    }, []);

    acc = acc.concat(_files);
    return acc;

  }, []);

  console.log(yellow(`    dest: ${copySet.outDir}`));
  console.log('\n');

  task(`:copy:${copySet.id}`, function (done: Function) {
    const stream: any = src(filePaths)
      .pipe(dest(join(cliTasks.relativeToProjectRoot, copySet.outDir)));

    stream.on('end', (error: any) => {
      console.log(magenta(`    finished: ${copySet.outDir}`));
      if (error) {
        done(error);
      } else {
        done();
      }

    });
  });

  task(`:clean:${copySet.id}`, function (done: Function) {

    let dest: string = join(cliTasks.relativeToProjectRoot, copySet.outDir);

    Promise.all([
      rmfr(dest, {glob: true})
    ])
      .then(() => {
        console.log(magenta(`    clean: ${copySet.outDir}`));
        done();
      }).catch(() => {
        done();
      console.log('fail to clean.env');
    });

  });

  task('copy', sequenceTask(`:clean:${copySet.id}`,
    `:copy:${copySet.id}`));

  gulp.start('copy');


}


