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
    telefone: undefined,
    endereco: '',
    paciente:{
      nome: '',
      sexo: '',
      dataNascimento: '',
      telefone: undefined,
      endereco: '',
      instituicao: ''
    }
  }

  // paciente: Paciente = {
  //   nome: '',
  //   sexo: '',
  //   dataNascimento: '',
  //   telefone: undefined,
  //   endereco: '',
  //   instituicao: '',
  //   cuidador:{
  //     nome: '',
  //     sexo: '',
  //     dataNascimento: '',
  //     telefone: undefined,
  //     endereco: ''
  //   }
  // }

  // cuidador: Cuidador = {
  //   nome: '',
  //   sexo: '',
  //   dataNascimento: '',
  //   telefone: undefined,
  //   endereco: ''
  // }

  constructor(private router: Router, private cuidadoresList: PacienteService) { }

  ngOnInit() {
  }

  public cadastraPaciente(cuidador: Cuidador){
    this.cuidadoresList.create(cuidador).then(ref => {
      this.router.navigate(['/pacientes-list'])
    })
  }

}
