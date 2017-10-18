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
  <%= name %>Component,
} from './<%= componentFilename %>';


@NgModule({
  imports: [MatCommonModule],
  exports: [
    MatCommonModule,
  ],
  declarations: [
    <%= name %>Component,
  ],
})
export class <%= name %>Module {}
