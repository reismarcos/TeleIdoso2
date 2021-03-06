import { Component, OnInit } from '@angular/core'
import { PacienteService } from '../services/paciente.service';
import { Router } from '@angular/router';
import { Cuidador } from '../models/cuidador/cuidador.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.page.html',
  styleUrls: ['./pacientes-list.page.scss'],
})
export class PacientesListPage implements OnInit {

  lista: Cuidador[];
  constructor(private loadingController: LoadingController, private router: Router, private cuidadoresList: PacienteService) {
   }

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

  public goToCadastroPacientes(){
    this.router.navigate(['/cadastro-pacientes']);
  }

  public visualizar(id){
    this.router.navigate(['/cadastro-pacientes', id]);
  }

  public goToFormsList(){
    this.router.navigate(['/form-list']);
  }

}
