import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: any;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'grid'
    },
    {
      title: 'Cuidadores',
      url: '/pacientes-list',
      icon: 'person'
    },
    {
      title: 'Formularios',
      url: '/form-list',
      icon: 'list'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastCtrl: ToastController,
    public firebaseauth: AngularFireAuth,
    private router: Router
    
  ) {
    firebaseauth.user.subscribe((data => {
      this.user = data;
    }));
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public Sair(): void {
    this.firebaseauth.auth.signOut()
    .then(() => {
      this.exibirToast('Você saiu');
      this.router.navigate(['/home']);
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

}
