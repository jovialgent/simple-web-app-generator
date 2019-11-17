import { TestBed } from '@angular/core/testing';

import { NgSwagBasicUiClassesService } from './ng-swag-basic-ui-classes.service';

describe('NgSwagBasicUiClassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicUiClassesService = TestBed.get(NgSwagBasicUiClassesService);
    expect(service).toBeTruthy();
  });
});
