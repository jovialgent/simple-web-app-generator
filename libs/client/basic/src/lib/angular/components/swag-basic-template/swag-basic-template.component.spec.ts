import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwagBasicTemplateComponent } from './swag-basic-template.component';

describe('SwagBasicTemplateComponent', () => {
  let component: SwagBasicTemplateComponent;
  let fixture: ComponentFixture<SwagBasicTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwagBasicTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwagBasicTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
