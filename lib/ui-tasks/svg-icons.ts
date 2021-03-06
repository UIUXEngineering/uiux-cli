import { green, magenta, yellow } from 'chalk';
import { dest, src, task } from 'gulp';
import { join, normalize } from 'path';
import { Isvg } from '../utils/parse-cli-json';

const gulpCheerio = require('gulp-cheerio');
const gulpMdSvgstore = require('gulp-md-svgstore');
let gulp = require('gulp');

export function processIconSet(iconSet: Isvg, cliTasks: any): void {
  console.log('\n');
  console.log(yellow(`    set: ${join(iconSet.outDir, iconSet.setName) + `-` + iconSet.version + `.svg`}`));
  // Create files paths for gulp
  let iconTree: { [ key: string ]: any } = {};
  let srcPaths: string [] = Object.keys(iconSet.srcFiles);

  // "design/icons/views"
  let filePaths: string[] = srcPaths.reduce((acc: any, _pathItem: string) => {


    const fileNames: string[] = Object.keys(iconSet.srcFiles[_pathItem])
      .reduce((_acc: any, fileName: string) => {

        iconTree[fileName] = iconSet.srcFiles[_pathItem][fileName];

        const _path = normalize(join(cliTasks.relativeToProjectRoot, _pathItem, fileName));
        console.log(green(`    includes: ${join(_pathItem, fileName)}`));
        _acc.push(_path);
        return _acc;
      }, []);

    acc = acc.concat(fileNames);
    return acc;

  }, []);


  task('svg-icons', function (done: Function) {

    const stream: any = src(filePaths)
      .pipe(gulpCheerio({
        run: function ($: any, file: any) {

          const fileConfig = iconTree[file.relative];

          if (fileConfig && fileConfig.id) {
            $('svg').attr('id', fileConfig.id);
          }
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe(gulpMdSvgstore({
        // name of result svg
        outputFilename: iconSet.setName + '-' + iconSet.version + '.svg',

        // keep id's set in each file
        keepIds: true,

        // inlineSvg remove xmls meta
        inlineSvg: true
      }))
      .pipe(dest(join(cliTasks.relativeToProjectRoot, iconSet.outDir)));

    stream.on('end', () => {
      console.log(magenta(`    finished: ${join(iconSet.outDir, iconSet.setName) + `-` + iconSet.version + `.svg`}`));
    });

    stream.on('end', (error: any) => {
      done(error);
    });
  });

  gulp.start('svg-icons');
}


