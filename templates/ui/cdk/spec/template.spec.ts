/**
 * @license
 * Copyright UIUXEngineering Corporation All Rights Reserved.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= className %>Component } from './<%= componentFilename %>';

describe('<%= className %>Component', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ <%= className %>Component ],
      providers: []
    });

    TestBed.overrideComponent(<%= className %>Component, {
      set: {
        template: '<div>Override Template</div>'
      }
    });

    TestBed.compileComponents();

  }));

  beforeEach(() => {
    // spyOn option
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(<%= className %>Component);
    const cmp = fixture.debugElement.componentInstance;


    expect(cmp).toBeTruthy();
  });
});
