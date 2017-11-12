/**
 * @license
 * Copyright UIUXEngineering Corporation All Rights Reserved.
 */

import {NgModule} from '@angular/core';
import {MatCommonModule} from '@angular/material/core';
import {
  <%= className %>Service,
} from './<%= componentFilename %>';


@NgModule({
  imports: [],
  exports: [],
  providers: [
    <%= className %>Service,
  ],
})
export class <%= className %>Module {}
