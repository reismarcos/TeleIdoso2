import { Component, OnInit } from '@angular/core';
import { Formulario, FormularioService } from '../services/formulario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {

  listaForms: Formulario[];

  constructor(private router: Router, private formulariosList: FormularioService) { }

  ngOnInit() {
    this.formulariosList.getFormularios().subscribe(res => {
      this.listaForms = res;
    })
  }

  public goToFormulario(){
    this.router.navigate(['/formulario']);
  }

  public goToDetails(id){
    this.router.navigate(['/form-details', id]);
  }

}
