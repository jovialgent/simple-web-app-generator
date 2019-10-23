import { TestBed } from '@angular/core/testing';

import { NgSwagBasicActionsProcessService } from './ng-swag-basic-actions-process.service';

describe('NgSwagBasicActionsProcessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicActionsProcessService = TestBed.get(NgSwagBasicActionsProcessService);
    expect(service).toBeTruthy();
  });
});
