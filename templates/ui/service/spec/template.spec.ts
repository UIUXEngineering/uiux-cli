/**
 * @license
 * Copyright UIUXEngineering Corporation All Rights Reserved.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { <%= className %> } from './<%= componentFilename %>';

describe('<%= className %>', () => {

  let test: any;
  let customInjector: any;
  let service: any;

  beforeEach(async(() => {

    test = {};
    customInjector = [];

    // test.something = createSomethingMock();
    // customInjector.push(test.something.provider);
    // service = new <%= className %>(...customInjector);

  }));

  beforeEach(() => {
    // spyOn option
  });

  afterEach(() => {
    test = null;
    customInjector = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
