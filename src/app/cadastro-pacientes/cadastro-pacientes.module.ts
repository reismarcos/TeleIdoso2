import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroPacientesPage } from './cadastro-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPacientesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroPacientesPage]
})
export class CadastroPacientesPageModule {}
