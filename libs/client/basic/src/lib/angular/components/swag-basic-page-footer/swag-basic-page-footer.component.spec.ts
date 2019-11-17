import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicPageFooterComponent } from './swag-basic-page-footer.component';

describe('SwagBasicPageFooterComponent', () => {
  let component: SwagBasicPageFooterComponent;
  let fixture: ComponentFixture<SwagBasicPageFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicPageFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicPageFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
