import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicSiteLinkComponent } from './swag-basic-site-link.component';

describe('SwagBasicSiteLinkComponent', () => {
  let component: SwagBasicSiteLinkComponent;
  let fixture: ComponentFixture<SwagBasicSiteLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicSiteLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicSiteLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
