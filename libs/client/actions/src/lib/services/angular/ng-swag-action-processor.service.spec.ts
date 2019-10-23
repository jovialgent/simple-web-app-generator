import { TestBed } from '@angular/core/testing';

import { NgSwagActionProcessorService } from './ng-swag-action-processor.service';

describe('NgSwagActionProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagActionProcessorService = TestBed.get(NgSwagActionProcessorService);
    expect(service).toBeTruthy();
  });
});
