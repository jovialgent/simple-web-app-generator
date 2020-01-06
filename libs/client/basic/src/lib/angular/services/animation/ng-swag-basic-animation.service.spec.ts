import { TestBed } from '@angular/core/testing';

import { NgSwagBasicAnimationService } from './ng-swag-basic-animation.service';

describe('NgSwagBasicAnimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicAnimationService = TestBed.get(NgSwagBasicAnimationService);
    expect(service).toBeTruthy();
  });
});
