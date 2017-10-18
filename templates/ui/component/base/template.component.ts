/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './<%= dashCaseBasename %>.html',
  styleUrls: ['./<%= dashCaseBasename %>.scss']
})
export class <%= name %>Component implements OnInit, OnDestroy {

  constructor() { /* noop */}

  ngOnInit(): void { /* noop */ }

  ngOnDestroy(): void { /* noop */}

}
