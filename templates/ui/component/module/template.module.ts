/**
 * @license
 * Copyright SunPower Corporation All Rights Reserved.
 */

import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {
  <%= className %>Component,
} from './<%= componentFilename %>';


@NgModule({
  imports: [MatCommonModule],
  exports: [
    MatCommonModule,
  ],
  declarations: [
    <%= className %>Component,
  ],
})
export class <%= className %>Module {}
