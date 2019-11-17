import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicPageHeaderComponent } from './swag-basic-page-header.component';

describe('SwagBasicPageHeaderComponent', () => {
  let component: SwagBasicPageHeaderComponent;
  let fixture: ComponentFixture<SwagBasicPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
