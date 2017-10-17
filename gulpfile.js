'use strict';
/**
 * Load the TypeScript compiler, then load the TypeScript gulpfile which simply loads all
 * the tasks. The tasks are really inside tools/gulp/tasks.
 */

// Sets args in an object
require('./dist/utils/parse-args').getArgsArray();
require('./dist/gulpfile');
