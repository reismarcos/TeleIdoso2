import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'cadastro-pacientes', loadChildren: './cadastro-pacientes/cadastro-pacientes.module#CadastroPacientesPageModule' },
  { path: 'cadastro-pacientes/:id', loadChildren: './cadastro-pacientes/cadastro-pacientes.module#CadastroPacientesPageModule' },  
  { path: 'pacientes-list', loadChildren: './pacientes-list/pacientes-list.module#PacientesListPageModule' },
  { path: 'form-list/:id', loadChildren: './form-list/form-list.module#FormListPageModule' },
  { path: 'formulario', loadChildren: './formulario/formulario.module#FormularioPageModule' },
  { path: 'form-details/:id', loadChildren: './form-details/form-details.module#FormDetailsPageModule' },
  { path: 'formulario/:id', loadChildren: './formulario/formulario.module#FormularioPageModule' },
  { path: 'cuidadores-list', loadChildren: './cuidadores-list/cuidadores-list.module#CuidadoresListPageModule' },
  { path: 'form-semanal', loadChildren: './form-semanal/form-semanal.module#FormSemanalPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
