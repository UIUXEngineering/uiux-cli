import { magenta } from 'chalk';
import { dest, src, task } from 'gulp';
import { gulpTasks } from '../utils/enums';
import { getArgs, IArgs } from '../utils/parse-args';
import { sequenceTask } from '../utils/sequence-task';

const data = require('gulp-data');
const gulpTemplate = require('gulp-template');
const gulpRename = require('gulp-rename');

task(':ui-base', function (done: Function) {
  const args: IArgs = getArgs();

  const stream: any = src(args.gulp.srcBase)
    .pipe(data(() => (args.templateVars)))
    .pipe(gulpTemplate())
    .pipe(gulpRename(args.gulp.renameBase))
    .pipe(dest(args.gulp.dest));

  stream.on('end', () => {
    console.log(magenta(`    finished: ${args.gulp.dest}`));
  });

  stream.on('end', (error: any) => {
    done(error);
  });
});


task(':ui-platform', function (done) {
  const args: IArgs = getArgs();

  if (args.gulp.srcPlatform) {
    const stream: any = src(args.gulp.srcPlatform)
      .pipe(data(() => (args.templateVars)))

      // platform templates use filenames
      .pipe(gulpTemplate())
      .pipe(dest(args.gulp.dest));

    stream.on('end', () => {
      console.log(magenta(`    finished: ${args.gulp.dest}`));
    });

    stream.on('end', (error: any) => {
      done(error);
    });
  } else {
    done();
  }

});

task(':ui-module', function (done) {
  const args: IArgs = getArgs();

  if (args.gulp.srcModule) {
    const stream: any = src(args.gulp.srcModule)
      .pipe(data(() => (args.templateVars)))
      .pipe(gulpTemplate())
      .pipe(gulpRename(args.gulp.renameModule))
      .pipe(dest(args.gulp.dest));

    stream.on('end', () => {
      console.log(magenta(`    finished: ${args.gulp.dest}`));
    });

    stream.on('end', (error: any) => {
      done(error);
    });
  } else {
    done();
  }

});

task(':ui-theme', function (done) {
  const args: IArgs = getArgs();

  if (args.gulp.srcTheme) {
    const stream: any = src(args.gulp.srcTheme)
      .pipe(data(() => (args.templateVars)))
      .pipe(gulpTemplate())
      .pipe(gulpRename(args.gulp.renameTheme))
      .pipe(dest(args.gulp.dest));

    stream.on('end', () => {
      console.log(magenta(`    finished: ${args.gulp.dest}`));
    });

    stream.on('end', (error: any) => {
      done(error);
    });
  } else {
    done();
  }

});

task(':ui-spec', function (done) {
  const args: IArgs = getArgs();

  if (args.gulp.srcSpec) {
    const stream: any = src(args.gulp.srcSpec)
      .pipe(data(() => (args.templateVars)))
      .pipe(gulpTemplate())
      .pipe(gulpRename(args.gulp.renameSpec))
      .pipe(dest(args.gulp.dest));

    stream.on('end', () => {
      console.log(magenta(`    finished: ${args.gulp.dest}`));
    });

    stream.on('end', (error: any) => {
      done(error);
    });
  } else {
    done();
  }

});

// *.toString() is to just make typescript compiler happy.
task(gulpTasks.GENERATE, sequenceTask(':ui-base',
  ':ui-platform', ':ui-module', ':ui-theme', ':ui-spec'));
