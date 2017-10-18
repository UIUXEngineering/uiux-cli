/**
 * This file is only for scaffolding to place
 * conditions if you do not want to directly
 * run a gulp task. For example, if you want
 * to run node or bash files directly.
 */
import { getArgsArray, IArgs } from './utils/parse-args';
import './ui-tasks/generate';

let gulp = require('gulp');

const args: IArgs = getArgsArray();

/**
 * Change process working directory to root directory of cli.
 */
process.chdir(args.gulp.cwd);

gulp.start(args.gulp.task);





