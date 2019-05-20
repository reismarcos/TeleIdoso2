import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPacientesPage } from './cadastro-pacientes.page';

describe('CadastroPacientesPage', () => {
  let component: CadastroPacientesPage;
  let fixture: ComponentFixture<CadastroPacientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPacientesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroPacientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
