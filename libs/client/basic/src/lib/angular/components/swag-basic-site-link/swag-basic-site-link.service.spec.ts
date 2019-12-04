import { TestBed } from '@angular/core/testing';

import { SwagBasicSiteLinkService } from './swag-basic-site-link.service';

describe('SwagBasicSiteLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SwagBasicSiteLinkService = TestBed.get(SwagBasicSiteLinkService);
    expect(service).toBeTruthy();
  });
});
