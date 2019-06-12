import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario/usuario.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage {
  public user: any;
  @ViewChild('usuario') email;
  @ViewChild('senha') password;
  // public user: Usuario = {
  //   email: '',
  //   password: ''
  // };
  constructor(private router: Router,
                public toastCtrl: ToastController,
                public firebaseauth: AngularFireAuth) {
          firebaseauth.user.subscribe((data => {
          this.user = data;
        }));     
  }
  // public LoginComEmail(): void {
  public LoginComEmail(email: string, password: string): void {
    this.firebaseauth.auth.signInWithEmailAndPassword(email , password)
    // this.firebaseauth.auth.signInWithEmailAndPassword(this.email.value , this.password.value)
      .then(() => {
        this.exibirToast('Login efetuado com sucesso');
      })
      .catch((erro: any) => {
        this.exibirToast('Email ou senha incorreto');
      });
  }
  // public cadastrarUsuario(): void {
  public cadastrarUsuario(email: string, password: string): void {
    this.firebaseauth.auth.createUserWithEmailAndPassword(email, password)
    // this.firebaseauth.auth.createUserWithEmailAndPassword(this.email.value , this.password.value)
    .then(() => {
      this.exibirToast('Usuário criado com sucesso');
    })
    .catch((erro: any) => {
      this.exibirToast('Email ou senha incorreto');
      console.log(erro);
    });
  }

  resetPassword(email: string): any {
    this.firebaseauth.auth.sendPasswordResetEmail(email.toString()).then(() => {
      this.exibirToast('Senha enviada');
      console.log('Senha enviada');
    })
    .catch((erro: any) => {
      this.exibirToast('Digite um email válida');
      console.log(erro);
    });
  }

  public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
    })
    .catch((erro: any) => {
      this.exibirToast(erro);
    });
  }

  private async exibirToast(mensagem: string) {
    let toast = await this.toastCtrl.create({
      duration: 3000, 
      message: mensagem, 
      position: 'bottom'
    });
  
    toast.present();      
  }

  public addPaciente(){
    this.router.navigate(['/cadastro-pacientes']);
  }

  public addForm(){
    this.router.navigate(['/formulario']);
  }

  public addFormSemanal(){
    this.router.navigate(['/form-semanal']);
  }

  public goToForms(){
    this.router.navigate(['/cuidadores-list']);
  }


}
