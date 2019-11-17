import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBasicHtmlTemplateComponent } from './ng-basic-html-template.component';

describe('NgBasicHtmlTemplateComponent', () => {
  let component: NgBasicHtmlTemplateComponent;
  let fixture: ComponentFixture<NgBasicHtmlTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBasicHtmlTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBasicHtmlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
