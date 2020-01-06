import { TestBed } from '@angular/core/testing';

import { NgSwagBasicTimeupdateService } from './ng-swag-basic-timeupdate.service';

describe('NgSwagBasicTimeupdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicTimeupdateService = TestBed.get(NgSwagBasicTimeupdateService);
    expect(service).toBeTruthy();
  });
});
