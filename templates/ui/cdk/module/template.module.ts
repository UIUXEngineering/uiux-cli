/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
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
