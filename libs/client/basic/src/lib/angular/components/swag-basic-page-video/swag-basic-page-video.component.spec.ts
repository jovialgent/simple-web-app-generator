import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicPageVideoComponent } from './swag-basic-page-video.component';

describe('SwagBasicPageVideoComponent', () => {
  let component: SwagBasicPageVideoComponent;
  let fixture: ComponentFixture<SwagBasicPageVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicPageVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicPageVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
