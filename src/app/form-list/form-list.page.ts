import { Component, OnInit } from '@angular/core';
import { Formulario, FormularioService } from '../services/formulario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  userName: string;
  listaForms: any;

  constructor(private pacienteService: PacienteService, private router: Router, private route: ActivatedRoute, private loadingController: LoadingController, private formularioList: FormularioService) { 

  }

  ngOnInit() {
    this.userName = this.route.snapshot.params['id'];
    this.loadFormularios();
  }

  async loadFormularios(){
    const loading = await this.loadingController.create({
      message: 'Carregando formulários'
    });
    await loading.present();

    this.formularioList.getFormularios().subscribe(res => {
      loading.dismiss();
      this.listaForms = res;
    })
  }

  public goToFormulario(){
    this.router.navigate(['/formulario']);
  }

  public goToDetails(id){
    this.router.navigate(['/form-details', id]);
  }

  public goToEdit(id){
    this.router.navigate(['/formulario', id]);
  }

}
