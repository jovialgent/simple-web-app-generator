import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicPageNavigationComponent } from './swag-basic-page-navigation.component';

describe('SwagBasicPageNavigationComponent', () => {
  let component: SwagBasicPageNavigationComponent;
  let fixture: ComponentFixture<SwagBasicPageNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicPageNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicPageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
