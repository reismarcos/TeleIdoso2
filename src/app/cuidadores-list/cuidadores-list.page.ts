import { Component, OnInit } from '@angular/core'
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';
import { Cuidador } from '../models/cuidador/cuidador.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cuidadores-list',
  templateUrl: './cuidadores-list.page.html',
  styleUrls: ['./cuidadores-list.page.scss'],
})
export class CuidadoresListPage implements OnInit {

  lista: Cuidador[];
  constructor(private loadingController: LoadingController, private router: Router, private cuidadoresList: PacienteService) { }

  ngOnInit() {
    this.loadCuidadores();
  }

  async loadCuidadores(){
    const loading = await this.loadingController.create({
      message: 'Carregando cuidadores'
    });

    await loading.present();
    this.cuidadoresList.getAll().subscribe(res => {
      loading.dismiss();
      this.lista = res;
    })
  }

  public goToCuidadorForms(id){
    this.router.navigate(['/form-list', id]);
  }

  public goToFormulario(){
    this.router.navigate(['/formulario']);
  }

}
