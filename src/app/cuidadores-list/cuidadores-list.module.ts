import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CuidadoresListPage } from './cuidadores-list.page';

const routes: Routes = [
  {
    path: '',
    component: CuidadoresListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CuidadoresListPage]
})
export class CuidadoresListPageModule {}
