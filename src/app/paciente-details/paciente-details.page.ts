import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente/paciente.model';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Cuidador } from '../models/cuidador/cuidador.model';

@Component({
  selector: 'app-paciente-details',
  templateUrl: './paciente-details.page.html',
  styleUrls: ['./paciente-details.page.scss'],
})
export class PacienteDetailsPage implements OnInit {

  cuidador: Cuidador;
  cuidadorKey = null;
  constructor(private cuidadoresList: PacienteService, private route: ActivatedRoute, private loadingController: LoadingController) { }

  ngOnInit() {
    this.cuidadorKey = this.route.snapshot.params['id'];
    if(this.cuidadorKey){
      this.loadPaciente();
    }
  }

  async loadPaciente(){
    const loading = await this.loadingController.create({
      message: 'Loading Paciente..'
    });

    await loading.present();

    this.cuidadoresList.getPaciente(this.cuidadorKey).subscribe(res =>{
      loading.dismiss();
      this.cuidador = res;
    });
  }

}
