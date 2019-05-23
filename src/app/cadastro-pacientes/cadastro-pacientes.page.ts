import { Component, OnInit } from '@angular/core';
import { Paciente } from '../models/paciente/paciente.model';
import { Router } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { Cuidador } from '../models/cuidador/cuidador.model';

@Component({
  selector: 'app-cadastro-pacientes',
  templateUrl: './cadastro-pacientes.page.html',
  styleUrls: ['./cadastro-pacientes.page.scss'],
})
export class CadastroPacientesPage implements OnInit {

  cuidador: Cuidador = {
    nome: '',
    sexo: '',
    dataNascimento: '',
    telefone: '',
    endereco: '',
    paciente: {
      nome: '',
      sexo: '',
      dataNascimento: '',
      telefone: '',
      endereco: '',
      instituicao: ''
    }
  }

  constructor(private router: Router, private cuidadoresList: PacienteService) { }

  ngOnInit() {
  }

  public cadastraPaciente(cuidador: Cuidador){
    this.cuidadoresList.create(cuidador).then(ref => {
      this.router.navigate(['/pacientes-list'])
    })
  }

}
