import {task} from 'gulp';
import {generateUI} from './enums';
import {yellow} from 'chalk';
import {getArgs} from '../utils/parse-args';

task(generateUI.COMPONENT, function() {
  console.log('COMPONENT');
  console.log(getArgs());
  console.log();
  console.log('Please specify a gulp task you want to run.');
  console.log(`You're probably looking for ${yellow('test')} or ${yellow('serve:devapp')}.`);
  console.log();
});

task(generateUI.CDK, function() {
  console.log('CDK');
  console.log(getArgs());
  console.log();
  console.log('Please specify a gulp task you want to run.');
  console.log(`You're probably looking for ${yellow('test')} or ${yellow('serve:devapp')}.`);
  console.log();
});
