import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente/paciente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { Cuidador } from '../models/cuidador/cuidador.model';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-pacientes',
  templateUrl: './cadastro-pacientes.page.html',
  styleUrls: ['./cadastro-pacientes.page.scss'],
})
export class CadastroPacientesPage implements OnInit {
  cuidadorKey = null;
  
  cuidador: Cuidador = {
    nome: '',
    sexo: '',
    dataNascimento: '',
    telefone: '',
    endereco: '',
    fag: '',
    parentesco: '',
    tipoCuidador: '',
    paciente: {
      nome: '',
      sexo: '',
      dataNascimento: '',
      telefone: '',
      endereco: '',
      instituicao: '',
      fag: '',
      mcq: '',
      
    }
  }

  constructor(private cuidadoresList: PacienteService, private route: ActivatedRoute, private loadingController: LoadingController, private router: Router) { }

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

  public cadastraPaciente(cuidador: Cuidador){
    this.cuidadoresList.create(cuidador).then(ref => {
      this.router.navigate(['/pacientes-list'])
    })
  }

}
