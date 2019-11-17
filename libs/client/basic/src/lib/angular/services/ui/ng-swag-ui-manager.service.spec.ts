import { TestBed } from '@angular/core/testing';

import { NgSwagUiManagerService } from './ng-swag-ui-manager.service';

describe('NgSwagUiManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagUiManagerService = TestBed.get(NgSwagUiManagerService);
    expect(service).toBeTruthy();
  });
});
