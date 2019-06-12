import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSemanalPage } from './form-semanal.page';

describe('FormSemanalPage', () => {
  let component: FormSemanalPage;
  let fixture: ComponentFixture<FormSemanalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSemanalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
