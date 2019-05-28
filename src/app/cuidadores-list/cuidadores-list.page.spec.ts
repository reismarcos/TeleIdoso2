import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuidadoresListPage } from './cuidadores-list.page';

describe('CuidadoresListPage', () => {
  let component: CuidadoresListPage;
  let fixture: ComponentFixture<CuidadoresListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuidadoresListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuidadoresListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
