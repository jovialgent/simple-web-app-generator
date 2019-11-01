import { TestBed } from '@angular/core/testing';

import { NgSwagBasicRulesService } from './ng-swag-basic-rules.service';

describe('NgSwagBasicRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSwagBasicRulesService = TestBed.get(NgSwagBasicRulesService);
    expect(service).toBeTruthy();
  });
});
