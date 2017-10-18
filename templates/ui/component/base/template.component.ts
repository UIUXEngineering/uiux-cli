import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class <%= name %>Component implements OnInit, OnDestroy {

  constructor() { /* noop */}

  ngOnInit(): void { /* noop */ }

  ngOnDestroy(): void { /* noop */}

}
