import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicSiteVideoNativeComponent } from './swag-basic-site-video-native.component';

describe('SwagBasicSiteVideoNativeComponent', () => {
  let component: SwagBasicSiteVideoNativeComponent;
  let fixture: ComponentFixture<SwagBasicSiteVideoNativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicSiteVideoNativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicSiteVideoNativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
