
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
