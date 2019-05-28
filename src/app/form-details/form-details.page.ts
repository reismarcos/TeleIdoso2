import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormularioService, Formulario } from '../services/formulario.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {
  formulario: Formulario;
  question = 0;
  formularioKey = null;
  constructor(private router: Router, private route: ActivatedRoute, private loadingController: LoadingController, private formularioList: FormularioService) {
    this.loadFormulario();
   }

   ngOnInit() {
    this.formularioKey = this.route.snapshot.params['id'];
    if(this.formularioKey){
      this.loadFormulario();
    }
  }

  async loadFormulario(){
    const loading = await this.loadingController.create({
      message: 'Carregando Formulário..'
    });

    await loading.present();

    this.formularioList.getFormulario(this.formularioKey).subscribe(res =>{
      loading.dismiss();
      this.formulario = res;
    });
  }

  public setQuestion(q){
    this.question = q;
  }

  saveChanges(){
    this.formularioList.updateFormulario(this.formulario, this.formularioKey).then(ref => {
      this.router.navigate(['/home'])
      });
  }

  

}
