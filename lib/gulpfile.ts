import {getArgsArray, IArgs} from './utils/parse-args';
import {generateUI} from './ui-tasks/enums';
import './ui-tasks/generate';
let gulp = require('gulp');


const args: IArgs = getArgsArray();

if (args.g) {
  switch (args.template) {

    case generateUI.COMPONENT:
      gulp.start(generateUI.COMPONENT);
      break;

    case generateUI.CDK:
      gulp.start(generateUI.CDK);
      break;
  }
}





