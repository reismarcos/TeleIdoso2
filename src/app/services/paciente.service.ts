import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs'
import { Formulario } from '../services/formulario.service';

import { map } from 'rxjs/operators';
import { Cuidador } from '../models/cuidador/cuidador.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  // private pacientesListRef = this.db.list<Paciente>('pacientes')
  private formulariosCollection: AngularFirestoreCollection<Formulario>;
  private cuidadoresCollection: AngularFirestoreCollection<Cuidador>;
  private cuidadoresList: Observable<Cuidador[]>;
  private formularioList: Observable<Formulario[]>;

  // constructor(private db: AngularFireDatabase) { }
  constructor(private db: AngularFirestore) { 
    this.cuidadoresCollection = db.collection<Cuidador>('cuidadores');
    this.cuidadoresList = this.cuidadoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )

  }

  public getAll(){
    return this.cuidadoresList;
  }

  public async create(cuidador: Cuidador){
    let id = await this.cuidadoresCollection.ref.doc().id;
    cuidador['key'] = id;
    return this.cuidadoresCollection.doc(id).set(cuidador);
  }

  public async addFormulario(cuidadorKey: string, formulario: any){
    let id = await this.cuidadoresCollection.doc(cuidadorKey).collection('formularios').ref.doc().id;
    formulario['key'] = id;
    return this.cuidadoresCollection.doc(cuidadorKey).collection('formularios').doc(id).set(formulario);
  }

  public getPaciente(id): Observable<any>{
    return this.cuidadoresCollection.doc<Cuidador>(id).valueChanges();
  }

  updatePaciente(cuidador: Cuidador, id: string){
    return this.cuidadoresCollection.doc(id).update(cuidador);
  }

  public remove(id){
    return this.cuidadoresCollection.doc(id).delete;
  }


  // public getAll(){
  //   return this.pacientesListRef; 
  // }

  // public create(paciente: Paciente){
  //   return this.pacientesListRef.push(paciente); 
  // }
}
