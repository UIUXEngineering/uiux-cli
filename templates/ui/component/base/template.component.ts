/**
 * @license
 * Copyright UIUXEngineering Corporation All Rights Reserved.
 */

import {
  Component,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './<%= dashCaseBasename %>.html',
  styleUrls: ['./<%= dashCaseBasename %>.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'class': '<%= dashCaseBasename %>'},
})
export class <%= className %>Component implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { /* noop */ }

  ngOnInit(): void { /* noop */ }

  ngAfterViewInit(): void { /* noop */ }

  ngOnDestroy(): void { /* noop */ }

}
