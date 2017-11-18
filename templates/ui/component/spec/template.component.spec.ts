/**
 * @license
 * Copyright UIUXEngineering Corporation All Rights Reserved.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= className %>Component } from './<%= componentFilename %>';

describe('<%= className %>Component', () => {

  let test: any;
  let customInjector: any;

  beforeEach(async(() => {

    test = {};
    customInjector = [];

    // test.something = createSomethingMock();
    // customInjector.push(test.something.provider);

    TestBed.configureTestingModule({
      declarations: [ <%= className %>Component ],
      providers: [...customInjector]
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

  afterEach(() => {
    test = null;
    customInjector = null;
  });

  describe('upon init', () => {
    let fixture;
    let cmp;

    beforeEach(() => {
      fixture = TestBed.createComponent(<%= className %>Component);
      cmp = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture = undefined;
      cmp = undefined;
    });

    it('should be created', () => {
      expect(cmp).toBeDefined();
    });

  });
});
