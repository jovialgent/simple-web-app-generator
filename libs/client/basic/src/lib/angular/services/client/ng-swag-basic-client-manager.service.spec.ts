import { TestBed } from '@angular/core/testing';

import { NgSwagBasicClientManagerService } from './ng-swag-basic-client-manager.service';

describe('NgSwagBasicClientManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicClientManagerService = TestBed.get(NgSwagBasicClientManagerService);
    expect(service).toBeTruthy();
  });
});
