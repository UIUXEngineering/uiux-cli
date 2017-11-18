/**
 * @license
 * Copyright SunPower Corporation All Rights Reserved.
 */

import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {
  <%= className %>,
} from './<%= componentFilename %>';


@NgModule({
  imports: [],
  exports: [],
  providers: [
    <%= className %>,
  ],
})
export class <%= className %>Module {}
