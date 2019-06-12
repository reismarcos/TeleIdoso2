import { Component, OnInit, OnChanges } from '@angular/core';
import { FormularioService, Formulario } from '../services/formulario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PacienteService } from '../services/paciente.service';
import { Paciente } from '../models/paciente/paciente.model';
import { Observable } from 'rxjs'
import { AlertController, LoadingController } from '@ionic/angular';
import { Cuidador } from '../models/cuidador/cuidador.model';

@Component({
  selector: 'app-form-semanal',
  templateUrl: './form-semanal.page.html',
  styleUrls: ['./form-semanal.page.scss'],
})
export class FormSemanalPage implements OnInit {

  lista: Cuidador[];
  cuidador: string;
  objCuidador: Cuidador;
  question = 0;
  showInter = 0;
  showOptions = 0;
  validateMsg: string;
  titulo = 'INSTRUMENTO DE TELEMONITORAMENTO - CUIDADOR DE PESSOAS COM DEMÊNCIA';
  formularioKey = null;
  questions = ['I1', 'I4', 'I5', 'I6', 'III1', 'III4', 'III7', 'III11', 'III12', 'IV5', 'V1'];
  
  //Variaveis para checkbox
  III1_2A:boolean; III1_2B:boolean; III1_2C:boolean; III1_2D:boolean; III1_2E:boolean; III1_2F:boolean;  III1_2G:boolean; III1_2H:boolean; III1_2I:boolean; III1_2j:any;
  III12_1A:boolean; III12_1B:boolean; III12_1C:boolean; III12_1D:boolean; III12_1E:boolean; III12_1F:boolean;  III12_1G:boolean; III12_1H:boolean; III12_1I:boolean; III12_1j:any;
  III9_A:boolean; III9_B:boolean; III9_C:boolean; III9_D:boolean; III9_E:boolean; III9_F:boolean;  III9_G:boolean; III9_H:boolean; III9_I:boolean;


  //Variaveis para checkbox de intervenção
  IR2_A:boolean; IR2_B:boolean;
  IIIR3_A:boolean; IIIR3_B:boolean; IIIR3_C:boolean;
  IIIR5_A:boolean; IIIR5_B:boolean; IIIR5_C:boolean;
  IIIR6_A:boolean; IIIR6_B:boolean;
  IIIR8_A:boolean; IIIR8_B:boolean; IIIR8_C:boolean;
  IVR2_A:boolean; IVR2_B:boolean;

  formulario: Formulario = {
    tipoLigacao: 'Ligação semanal',
    numeroLigacao: 0,
    cuidador: '',
    data: '',
    // Variaveis relacionadas a parte I
    I1: '',
    I2: '',
    I2_1:[],
    I2_2: '',
    IR1: [],
    I3: '',
    I4: '',
    I5: '',
    I5_1:'',
    I6: '',
    IR2: [],
    I7: '',
    IR3: [],
    // Variaveis relacionadas a parte II
    II1: '',
    II2: '',
    II3: '',
    II4: '',
    II5: '',
    II6: '',
    II7: '',
    II8: '',
    IIR1:[],
  
    // Variaveis relacionadas a parte III
    III1: '',
    III1_1: '',
    III1_2:[],
    III2:'',
    III2_1: '',
    IIIR1: [],
    III3: '',
    III3_1: [],
    IIIR2: [],
    III4: '',
    III4_1: '',
    IIIR3: [],
    III5: '',
    III6: '',
    IIIR4: [],
    III7: '',
    III7_1: '',
    IIIR5: [],
    III8:'',
    III9:[],
    III9_1:'',
    III9_2: '',
    IIIR6: [],
    III10: '',
    IIIR7: [],
    III11:'',
    III11_1: '',
    IIIR8:[],
    III12: '',
    III12_1: [],
    III12_2: '',
    III13: '',
    IIIR9: [],
    
    // Variaveis relacionadas a parte IV
    IV1: '',
    IV1_1: '',
    IV2: '',
    IV3: '',
    IV3_1: '',
    IV4: '',
    IV4_1: '',
    IVR1: [],
    IV5: '',
    IVR2: [],
  
    // Variaveis relacionadas a parte V
    V1: '',
    V2: '',
    V2_1: '',
    VR1: [],
  };

  formularioId = null;

  constructor(private loadingController: LoadingController, private pacienteService: PacienteService, private route: ActivatedRoute, private router: Router, private formularioService: FormularioService, private cuidadoresList: PacienteService, private AlertController: AlertController){
    console.log(this.showOptions);
    this.formulario.data = new Date().toISOString();
    this.validateMsg = "";
  }

  ngOnInit() {
    this.loadCuidadores();
    this.formularioKey = this.route.snapshot.params['id'];
    if(this.formularioKey){
      this.formularioService.getFormulario(this.formularioKey).subscribe(res =>{
        this.formulario = res;
      });
    }
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
  

  public setQuestion(q){
    if (this.showInter == 1){
      this.showInter = 0;
    }
    this.question = q;
    this.changeTitulo();

    if (q === 13){
      this.validateForm();
    } 
    else{
      this.validateMsg = '';
    }
  }

  public setInter(i){
    if (i == this.showInter){
      this.showInter = 0;
    }
    else{
    this.showInter = i;
    }
    
  }

  public changeTitulo(){
    if (this.question === 0) { this.titulo = 'INSTRUMENTO DE TELEMONITORAMENTO - CUIDADOR DE PESSOAS COM DEMÊNCIA'};
    if (this.question > 0 && this.question < 5) {this.titulo = "I - ESTADO DE SAÚDE DO IDOSO"};
    if (this.question >= 5 && this.question < 11) {this.titulo = "III– ESTADO DE SAÚDE DO CUIDADOR"};
    if (this.question === 11) {this.titulo = "IV- RELACIONAMENTO ENTRE O CUIDADOR E O RECEPTOR DE CUIDADOS"};
    if (this.question === 12 ) {this.titulo = "V- PROCESSOS FAMILIARES"};
    if (this.question === 13) {this.titulo = "FINALIZAR FORMULARIO"}

  }

  public nextQuestion() {
    if (this.showInter === 1){
      this.showInter = 0;
    }
    if (this.question + 1 < 37){
      this.question ++;
      this.changeTitulo();
    }

    if (this.question === 13){
      this.validateForm();
    }

  }
 
  public async saveForm(){
    const alert = await this.AlertController.create({
      header: 'Salvar',
      message: 'Deseja salvar esse formulário?',
      buttons: [
        {
          text: 'Cancelar' // don't do anything when cancel
        },
        {
          text: 'Confirmar',
          handler: () => {
          this.checkboxTraslate();
          this.formularioService.addFormulario(this.formulario).then(ref => {
          this.router.navigate(['/home'])
          })
          }
          }
          ]
          });
          await alert.present();
  }

 public checkboxTraslate(){

  /* Checkbox Intervenção IR2 - I6 */
  if (this.IR2_A) { this.formulario.IR2.push("Ensinar ao cuidador os planos médicos e de enfermagem para o cuidado")};
  if (this.IR2_B) { this.formulario.IR2.push("Determinar as expectativas comportamentais adequadas ao estado cognitivo do idoso")};

  /* Checkbox Questao III1.2 */
  if (this.III1_2A) { this.formulario.III1_2.push('HAS') };
  if (this.III1_2B) { this.formulario.III1_2.push('DM') };
  if (this.III1_2C) { this.formulario.III1_2.push('Cardiopatia') };
  if (this.III1_2D) { this.formulario.III1_2.push('Doença renal') };
  if (this.III1_2E) { this.formulario.III1_2.push('Problema gastrointestinal') };
  if (this.III1_2F) { this.formulario.III1_2.push('Problema emocional/psicológico') };
  if (this.III1_2G) { this.formulario.III1_2.push('Enxaqueca') };
  if (this.III1_2H) { this.formulario.III1_2.push('Sobrepeso') };
  if (this.III1_2I) { this.formulario.III1_2.push(this.III1_2j)};

  /* Checkbox Intervenção IIIR3 - III4.1 */
  if (this.IIIR3_A) { this.formulario.IIIR3.push('Orientar sobre a necessidade de realização de uma dieta equilibrada') };
  if (this.IIIR3_B) { this.formulario.IIIR3.push('Manter alimentação de costume, dando preferência para alimentos leves (frutas e legumes), e evitando frituras e condimentados.') };
  if (this.IIIR3_C) { this.formulario.IIIR3.push('Orientar sobre a importância de uma boa dieta, exercícios e ingestão de líquidos durante o dia.') };

  /* Checkbox Intervenção IIIR5 - III7.1 */
  if (this.IIIR5_A) { this.formulario.IIIR5.push('Incentivar o cuidador a falar os porquês das respostas anteriores') };
  if (this.IIIR5_B) { this.formulario.IIIR5.push('Conversar visando demonstrar que compreende os motivos do cuidador') };
  if (this.IIIR5_C) { this.formulario.IIIR5.push('Orientar sobre formas de melhorar a rotina de cuidados') };

  /* Checkbox Intervenção IIIR6 - III9 */
  if (this.IIIR6_A) { this.formulario.IIIR6.push('Determinar risco de segurança para idoso e cuidador(sinais de violência)') };
  if (this.IIIR6_B) { this.formulario.IIIR6.push('Incentivar o cuidador a ventilar seus sentimentos de maneira adequada e segura (atividade física, socar saco de areia, arteterapia)') };

  /* Checkbox Intervenção IIIR8 - III11 */
  if (this.IIIR8_A) { this.formulario.IIIR8.push('Orientar o cuidador a manter ciclo normal de sono (não dormir de dia, dormir a noite)') };
  if (this.IIIR8_B) { this.formulario.IIIR8.push('Indicar técnicas de relaxamento, e redução da cafeína.') };
  if (this.IIIR8_C) { this.formulario.IIIR8.push('Orientar sobre a importância do sono ') };

    /* Checkbox Questao III9 */
    if (this.III9_A) { this.formulario.III9.push('Estressado') };
    if (this.III9_B) { this.formulario.III9.push('Impaciente') };
    if (this.III9_C) { this.formulario.III9.push('Nervoso') };
    if (this.III9_D) { this.formulario.III9.push('Com raiva') };
    if (this.III9_E) { this.formulario.III9.push('Ansioso') };
    if (this.III9_F) { this.formulario.III9.push('Irritado') };
    if (this.III9_G) { this.formulario.III9.push('Cansado') };
    if (this.III9_H) { this.formulario.III9.push('Esgotado') };
    if (this.III9_I) { this.formulario.III9.push('Calma/tranquilo') };


  
  /* Checkbox Questao III12.1 */
  if (this.III12_1A) { this.formulario.III12_1.push('Sai com amigos ou familiares') };
  if (this.III12_1B) { this.formulario.III12_1.push('Passeios a lugares diferentes') };
  if (this.III12_1C) { this.formulario.III12_1.push('Viaja') };
  if (this.III12_1D) { this.formulario.III12_1.push('Fica em casa') };
  if (this.III12_1E) { this.formulario.III12_1.push('Vai a Igreja') };
  if (this.III12_1F) { this.formulario.III12_1.push('Vai ao Cinema') };
  if (this.III12_1G) { this.formulario.III12_1.push('Vai ao Teatro') };
  if (this.III12_1H) { this.formulario.III12_1.push('Realiza caminhadas') };
  if (this.III12_1I) { this.formulario.III12_1.push(this.III12_1j)};

 /* Checkbox Intervenção IVR2 - IV5 */
 if (this.IVR2_A) { this.formulario.IVR2.push('Verificar se o idoso apresenta sinais de abuso emocional ') };
 if (this.IVR2_B) { this.formulario.IVR2.push('Identificar cuidadores que apresentam saúde física ou mental prejudicada') };

 }

 public validateForm(){
  for (let key of Object.keys(this.formulario)){
    if (this.formulario[key].length === 0){
      for ( let question of this.questions){
        if (key === question){
          this.validateMsg += key + "\n";
        }
      }
    }
  }
 }
}
